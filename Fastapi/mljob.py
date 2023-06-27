import json
import joblib
import numpy as np
from datetime import datetime
import pickle
import random
import dbjob
from datetime import datetime, timedelta
import logging
import pytz


def load_place_model():
    # 현재 날짜 가져오기
    current_date = datetime.now(pytz.timezone('Asia/Seoul'))
    
    # 하루를 뺀 날짜 계산
    previous_date = (current_date - timedelta(days=1)).strftime('%Y%m%d')
    
    # 이틀 뺀 날짜(오류 있을 때)
    twodays_ago = (current_date - timedelta(days=2)).strftime('%Y%m%d')
    
    try:
        # model = joblib.load('/app/models/place/place_model_20230626.pkl')
        model = joblib.load(f'/app/models/place/place_model_{previous_date}.pkl')
        logging.info('Load model Success')
        return model
    
    # 에러 생길 경우 base_model
    except Exception as e :
        model = joblib.load(f'/app/models/place/place_model_{twodays_ago}.pkl')
        logging.info(e)
        logging.info('Load model Fail, So used another version. Check Model Pipeline')
        return model
        
        
def place_predict(cur, features, predict_places = None):    
    # 변수 정의
    place_id = dbjob.return_place_id(cur, features['area_nm'])
    year = features["year"]
    month = features["month"]
    day = features["day"]
    hour = features["hour"]
    
    # 기상청 3일 예측 테이블에서 결과 값
    tmp, wsd, pcp, reh = dbjob.return_weather(year, month, day, hour)
    
    # rushhour, dow, holiday 정의
    rushhour, dow, holiday = return_info(year, month, day, hour)
    
    # 푸리에 변환
    fourier_cos_time, fourier_sin_time = time_feature(hour)
    
    # JSON 파일로드(인풋 데이터)
    with open('/app/models/place/place_model_input.json', 'r') as f:
        input_data = json.load(f)
        input_data[f'place_id_{place_id}'] = 1
        input_data[f'dow_{dow}'] = 1
        input_data['temp'] = tmp
        input_data['humidity'] = reh
        input_data['wind_spd'] = wsd
        input_data['precipitation'] = pcp
        input_data['fourier_cos_time'] = fourier_cos_time
        input_data['fourier_sin_time'] = fourier_sin_time
        input_data['holiday'] = holiday

    # 모델 로드
    model = load_place_model()
    
    
    # 예측
    if predict_places == None:
        return model.predict(list(input_data.values()))[0]
    
    # 예측할 places를 고정된 변수들과 함께 넣어주면 혼잡도 낮은 순으로 4개의 place data 추출
    else:
        input_data_list = []  # input_data를 저장할 리스트
        
        for predict_place_id in predict_places:
            # JSON 파일로드(인풋 데이터)
            with open('/app/models/place/place_model_input.json', 'r') as f:
                input_data = json.load(f)
                input_data[f'place_id_{predict_place_id}'] = 1
                input_data[f'dow_{dow}'] = 1
                input_data['temp'] = tmp
                input_data['humidity'] = reh
                input_data['wind_spd'] = wsd
                input_data['precipitation'] = pcp
                input_data['fourier_cos_time'] = fourier_cos_time
                input_data['fourier_sin_time'] = fourier_sin_time
                input_data['holiday'] = holiday
                
                input_data = list(input_data.values())
                input_data_list.append(input_data)
            
        # 예측
        predictions = model.predict(input_data_list)

        # place_id와 예측값 매핑 
        results = [{predict_places: prediction[0]} for predict_places, prediction in zip(predict_places, predictions) if predict_places != place_id]
        
        # 혼잡도 낮은 순으로 정렬 후 상위 4개 추출
        top4 = sorted(results, key=lambda x: list(x.values())[0])  # value 값이 작은 기준으로 정렬
        top4 = top4[:4]  # 상위 4개 추출

        # place_id값만 조회
        top4_ids = tuple([list(d.keys())[0] for d in top4])
        return top4, top4_ids


# 장소 주변 지하철 혼잡도 예측
def subway_predict(cur, features, subway_result):
    
    # 변수 정의
    place_id = dbjob.return_place_id(cur, features['area_nm'])
    year = features["year"]
    month = features["month"]
    day = features["day"]
    hour = features["hour"]
    rushhour, dow, holiday = return_info(year, month, day, hour)
    
    # hour 변환(바꿔둔 상태)
    hour_sin, hour_cos = time_feature(hour)
    
    # 비오는지 안오는지
    # 기상청 3일 예측 테이블에서 결과 값
    tmp, wsd, pcp, reh = dbjob.return_weather(year, month, day, hour)
    if pcp > 0:
        rainy = 1
    else :
        rainy = 0
    
    # model load
    model = joblib.load('/app/models/subway/catboost_model_0623_ver2 (2).pkl')
    
    # subway_result load
    for idx in range(len(subway_result)):
        subway_nb = subway_result[idx]["subway_nb"]
        line = subway_result[idx]["line"]
        q = dbjob.return_subway_q(cur, subway_nb)
        q1 = q['q1']
        q2 = q['q2']
        q3 = q['q3']
        
        
        # 원핫인코딩 전용 json 파일
        with open('/app/models/subway/subway_predict_base.json') as json_file:
            data = json.load(json_file)
    
            # holiday, rushhour 변수
            data[f'holiday'] = holiday
            data['rainy'] = rainy
            # data[f'rushhour'] = rushhour
            data['hour_sin'] = hour_cos
            data['hour_cos'] = hour_sin
            
            # 원핫인코딩 변수
            data[f'Station_num_{subway_nb}'] = 1
            data[f'Line_num_{line}'] = 1
            data[f'year_{year}'] = 1
            data[f'month_{month}'] = 1
            # data[f'hour_{hour}'] = 1
            data[f'weekday_{dow}'] = 1
            
            # 예측변수
            subway_prediction = model.predict(list(data.values()))
            subway_prediction = int(np.expm1(subway_prediction))
            
            if subway_prediction < q1:
                subway_prediction = '평상 시에 비해 여유로워요.'
            elif subway_prediction < q2:
                subway_prediction = '평상 시와 비슷하고, 좀 더 여유로울 수 있어요'
            elif subway_prediction < q3 :
                subway_prediction = '평상 시보다 다소 혼잡한 수준이에요'
            else :
                subway_prediction = '평상 시에 비해 굉장히 혼잡한 수준이에요'
            subway_result[idx]["prediction"] = subway_prediction

    return subway_result

def cyclical_encoding(x, max_val):
    sin_val = np.sin(2 * np.pi * x / max_val)
    cos_val = np.cos(2 * np.pi * x / max_val)
    return sin_val, cos_val

def return_info(year, month, day ,hour):
    # rushhour 변수
    rushhour_hours = [7, 8, 9, 17, 18, 19]
    if hour in rushhour_hours:
        rushhour = 1
    else:
        rushhour = 0
        
    # 요일
    date = datetime(year, month, day, hour)
    dow = (date.weekday() + 1) % 7
    
    # 휴일
    file_path = '/app/data/holiday.pkl'

    # 파일로부터 리스트 로드
    with open(file_path, 'rb') as file:
        holiday_list = pickle.load(file)
        if (date.strftime("%Y-%m-%d") in holiday_list) or dow in [0,6]:
            holiday = 1
        else:
            holiday = 0 
            
    return rushhour, dow, holiday

def time_feature(hour):
    # 시간 정보를 하나의 특징으로 합치기
    time_feature = hour / 24
    # 주기성을 나타내는 푸리에 특징 계산
    time_rad = 2 * np.pi * time_feature
    return np.cos(time_rad), np.sin(time_rad)