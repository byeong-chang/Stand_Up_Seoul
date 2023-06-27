from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from features import Features
from datetime import datetime, timedelta
import dbjob
import mljob
import json
import joblib
import logging
import pickle
import os
import random
from plugins import connection
import boto3


""" log """
log_folder = "./logs"
os.makedirs(log_folder, exist_ok=True)
today = datetime.now().strftime("%Y%m%d")
log_file = os.path.join(log_folder, f"FastAPI_{today}.log")
logging.basicConfig(filename=log_file, level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

app = FastAPI()
conn, cur = connection.mysql()

# CORS 미들웨어를 추가하여 CORS 정책 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http//124.58.161.196:3000", "http//192.168.219.103:3000", "http://121.170.162.128:3000", "http://192.168.113.66:3000", "http://222.112.208.70.3000"],  # 클라이언트의 도메인 주소를 여기에 추가
    allow_methods=["POST"],  # 요청 허용 메서드
    allow_headers=["*"],  # 요청 허용 헤더
)


# 다른 장소를 예측해서, 혼잡도가 낮은 곳을 기준으로 뱉어주는 함수
def recommand_another_place(cur, features):
    restaurant_category_list = features['restaurant_category_list']
    hotplaces_category_list = features['hotplaces_category_list']
    
    place_id = dbjob.return_place_id(cur, features["area_nm"])
    predict_places = dbjob.same_category_place(cur, place_id)
    top4, top4_ids = mljob.place_predict(cur, features, predict_places)
    result = dbjob.place_info(cur, top4_ids)
    result = dbjob.mapping_result(cur, top4, result)
    
    # # 추천된 4가지 장소에 맛집, 명소를 넣어주는 부분
    
    for idx, i in enumerate(result):
        result[idx]['restaurant'] = dbjob.restaurant(cur, result[idx]['id'], 1, restaurant_category_list)
        result[idx]['hotplaces'] = dbjob.hotplaces(cur, result[idx]['id'], 1, hotplaces_category_list)
    return result
        
    
""" API """
@app.post("/predict")
async def predict_seoul(features : Features):
    try:
        features = features.dict()
        restaurant_category_list = features['restaurant_category_list']
        hotplaces_category_list = features['hotplaces_category_list']
        
        # place_id 값으로 예측할 subway 정보 추출
        place_id = dbjob.return_place_id(cur, features["area_nm"])
        subway_result = dbjob.place_subway_result(cur, place_id)
            
        # 장소혼잡도 예측
        place_result = mljob.place_predict(cur, features)
        
        # 지하철 혼잡도 예측
        subway_result = mljob.subway_predict(cur, features, subway_result)
            
        # 메세지 및 한글 변환
        predict_value, predict_msg = dbjob.congest_msg(cur, place_result)
        
        
        # 장소 혼잡도 예측 결과가 1, 2일 경우
        if place_result in [1,2]:
            restaurant_result = dbjob.restaurant(cur, place_id, 4, restaurant_category_list)
            hotplaces_result = dbjob.hotplaces(cur, place_id, 4, hotplaces_category_list)
            
            # 로그 기록 수정
            features['place_id'] = place_id
            del features["area_nm"]
            logging.info(features)
            return {"place_congest" : predict_value, "place_congest_msg" : predict_msg, "near_subway" : subway_result, "restaurant" : restaurant_result, "hotplaces" : hotplaces_result}
        
        # 장소 혼잡도 예측 결과가 3,4일 경우
        elif place_result in [3,4]:
            another_place_result = recommand_another_place(cur, features)
            
            # 로그 기록 수정
            features['place_id'] = place_id
            del features["area_nm"]
            logging.info(features)
            return {"place_congest" : predict_value, "place_congest_msg" : predict_msg, "near_subway" : subway_result, "another_place" : another_place_result}

        
        
    except Exception as e:
        logging.error(e)
        raise


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # 파일 저장 경로 설정
    save_path = os.path.join("/app/models/place", file.filename)
    
    # 파일 저장
    with open(save_path, "wb") as f:
        contents = await file.read()
        f.write(contents)
    
    return {"filename": file.filename}

@app.get("/upload_log_toS3")
async def upload_log_toS3(date : str):
    
    # s3 연결
    s3 = connection.s3_connector()

    # 로컬 파일 경로
    local_filePath = f"/app/logs/FastAPI_{date}.log"

    # S3 버킷 정보 설정
    bucket = "standupseoul"
    
    # 키 값
    filePath, fileName = os.path.split(local_filePath)
    s3_key = f"raw/fastapi_logs/{fileName}"

    # 로컬 파일을 읽어서 S3에 업로드
    with open(local_filePath, "rb") as file:
        file_content = file.read()
        s3.put_object(Body=file_content, Key=s3_key, Bucket=bucket)

    return {"message": "Success"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)