# from airflow.providers.amazon.aws.hooks.redshift_sql import RedshiftSQLHook
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split
from sqlalchemy import create_engine
from datetime import datetime, timedelta
from catboost import CatBoostClassifier
from imblearn.over_sampling import SMOTE
# from plugins import slack
from plugins import connector
import os
import warnings
import joblib
import numpy as np
import pandas as pd
import logging
import sys

def main():
    # redshift connect
    conn, cur = connector.redshift_connector()
    
    # extract data
    df = extract_data_from_redshift(cur)
    
    # process
    df = processing_data(df)
    
    # model fit and save
    # save_path = sys.argv[1]
    save_path = 'C:/last_project/ML/data/abc.pkl'
    model_fit_save(df, save_path)


def extract_data(cur, sql):
    cur.execute(sql)
    columns = [desc[0] for desc in cur.description]
    results = cur.fetchall()
    logging.info(f'{len(results)}행 추출 완료')
    df = pd.DataFrame(results)
    df.columns = columns
    logging.info('데이터프레임 생성 완료')
    return df

def extract_data_from_redshift(cur):
    
    sql = '''
    SELECT
        P.place_id,
        P.area_congest_id,
        P.area_ppltn_min,
        P.area_ppltn_max,
        W.temp,
        W.sensible_temp,
        W.humidity,
        W.wind_dirct,
        W.wind_spd,
        W.precipitation,
        W.uv_index_lvl,
        W.pm25,
        W.pm10,
        W.air_idx_mvl,
        W.created_date,
        DATE_PART('year', W.created_date) AS year,
        DATE_PART('month', W.created_date) AS month,
        DATE_PART('day', W.created_date) AS day,
        DATE_PART('hour', W.created_date) AS hour,
        DATE_PART('minute', W.created_date) AS minute,
        EXTRACT(DOW FROM W.created_date) AS dow
    FROM
        "raw"."population" AS P
    JOIN
        "raw"."weather" AS W ON P.place_id = W.place_id AND P.created_date = W.created_date;
    '''
    
    df = extract_data(cur, sql)
    logging.info(df)
    return df

def processing_data(df):
    # 전처리
    cannotuse_columns = ['year', 'month', 'area_ppltn_min', 'area_ppltn_max', 'sensible_temp', 'wind_dirct', 'uv_index_lvl', 'pm25', 'pm10', 'air_idx_mvl']
    df = df.drop(columns = cannotuse_columns)

    '''시간 관련 전처리'''
    # 시간 관련 정보 추출
    hour = df['hour'].values

    # 시간 정보를 하나의 특징으로 합치기
    time_feature = hour / 24

    # 주기성을 나타내는 푸리에 특징 계산
    time_rad = 2 * np.pi * time_feature

    fourier_features = np.column_stack([
        np.cos(time_rad), np.sin(time_rad)])

    # 생성된 특징을 데이터프레임에 추가
    df['fourier_cos_time'] = fourier_features[:, 0]
    df['fourier_sin_time'] = fourier_features[:, 1]

    # 기존 시간 관련 컬럼 제거
    df = df.drop(columns=['day','hour','minute'])


    ''' 휴일 관련 전처리 '''
    # 휴일 관련 컬럼을 정의합니다.
    holiday_list = joblib.load('C:/last_project/ML/data/holiday.pkl')
    # created_date 컬럼을 datetime 형식으로 변환
    df['created_date'] = pd.to_datetime(df['created_date'])
    # holiday인 값을 디폴트 값 0으로 설정
    df['holiday'] = 0
    # created_date가 holiday_list에 포함된 날짜인 경우, holiday 컬럼을 1로 변경
    df.loc[df['created_date'].dt.strftime('%Y-%m-%d').isin(holiday_list), 'holiday'] = 1
    df = df.drop(columns = 'created_date')

    '''원핫인코딩'''
    onehot_features = ['place_id', 'dow']

    # one-hot encoding 수행
    df = pd.get_dummies(df, columns=onehot_features, dummy_na=False)
    return df

def compute_class_weights(y):
    class_counts = y.value_counts()
    total_samples = len(y)
    class_weights = {}
    for class_label, count in class_counts.items():
        weight = total_samples / (len(class_counts) * count)
        class_weights[class_label] = weight
    return class_weights

def model_fit_save(df, save_path):
    # 특성과 타겟 데이터 분할
    X = df.drop(columns = 'area_congest_id')
    y = df['area_congest_id']
    
    # # SMOTE 적용
    # smote = SMOTE(random_state=42)
    # X, y = smote.fit_resample(X, y)
    


    # train-test 분할
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=True)
    

    # 모델 검증
    # 베스트 파라미터 정의
    best_params = {'bagging_temperature': 0.5, 'depth': 7, 'iterations': 1000, 'l2_leaf_reg': 1, 'learning_rate': 0.5, 'random_strength': 0.5}


    # 클래스 가중치 계산
    class_weights = compute_class_weights(y)
    
    # 베스트 파라미터로 모델 학습
    model = CatBoostClassifier(**best_params, random_state = 42, class_weights=class_weights)

    # 모델 학습
    model.fit(X_train, y_train, eval_set = (X_test, y_test), verbose=True)
    
    # 학습 데이터 예측
    y_train_pred = model.predict(X_train)
    train_accuracy = accuracy_score(y_train, y_train_pred)
    train_precision = precision_score(y_train, y_train_pred, average='weighted')
    train_recall = recall_score(y_train, y_train_pred, average='weighted')
    train_f1 = f1_score(y_train, y_train_pred, average='weighted')

    # 테스트 데이터 예측
    y_test_pred = model.predict(X_test)
    test_accuracy = accuracy_score(y_test, y_test_pred)
    test_precision = precision_score(y_test, y_test_pred, average='weighted')
    test_recall = recall_score(y_test, y_test_pred, average='weighted')
    test_f1 = f1_score(y_test, y_test_pred, average='weighted')

    # 결과 출력
    print("Train Accuracy:", train_accuracy)
    print("Train Precision:", train_precision)
    print("Train Recall:", train_recall)
    print("Train F1-score:", train_f1)
    print()
    print("Test Accuracy:", test_accuracy)
    print("Test Precision:", test_precision)
    print("Test Recall:", test_recall)
    print("Test F1-score:", test_f1)
    

    # 모니터링 코드(슬랙)
    now = datetime.now().strftime('%Y년 %m월 %d일')
    # message = f'''
    #         {now} 학습 모델 결과
    #         accuracy : {accuracy}
    #         precision : {precision}
    #         recall : {recall}
    #         f1 : {f1}
    #         '''
            
    # print(message)
    # slack.send_message_to_a_slack_channel(message, ":heavy_check_mark:")

    print(f'Model accuracy: {test_accuracy}')
    
    
    
    # 전체 데이터 다시 fit
    model.fit(X, y)
    
    # 모델 저장
    now = datetime.now().strftime('%Y년 %m월 %d일')
    joblib.dump(model, save_path)
    

    
    
if __name__ == '__main__':
    main()
