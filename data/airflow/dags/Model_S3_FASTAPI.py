from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.hooks.S3_hook import S3Hook
from airflow.models import Variable
from datetime import datetime
from plugins import slack
from datetime import datetime, timedelta
import os
import pytz
import logging
import requests

# 서울 시간대를 사용하기 위해 타임존을 설정합니다.
seoul_tz = pytz.timezone('Asia/Seoul')
now_seoul = datetime.now(seoul_tz).strftime("%Y%m%d")
save_path = f'/var/lib/airflow/data/place_model_{now_seoul}.pkl'

def upload_model_toS3():
    
    # S3 버킷 연결
    bucket = 'standupseoul'
    s3_hook = S3Hook(bucket)
    
    filePath, fileName = os.path.split(save_path)
    
    # S3로 파일 업로드
    s3_key = f'models/ml/place/{fileName}'
    s3_hook.load_file(filename=save_path, key=s3_key, bucket_name=bucket, replace= True)
    logging.info(f'{s3_key} upload to S3 Success')
    
    
def upload_tofastAPI():
    fastapi_url = 'http://3.39.156.163:8000/upload'
    
    # FastAPI 서버로 파일 업로드
    with open(save_path, 'rb') as file:
        files = {'file': file}
        response = requests.post(fastapi_url, files=files)
    
    # 업로드 결과 확인
    logging.info(response.text)
    
    # 모델 삭제
    os.remove(save_path)


dag = DAG(
    dag_id = 'Model_S3_FASTAPI',
    start_date = datetime(2023, 6, 20, 12, 0, 0),
    schedule_interval='10 18 * * *',  # 한국 시간 기준 03시 10분에 작업 실행
    max_active_runs = 1,
    catchup = False,
    default_args = {
        'retries': 1,
        'retry_delay': timedelta(minutes=1),
        'on_failure_callback': slack.on_failure_callback
    }
)

model_fit_save = BashOperator(
    task_id='model_fit_save',
    bash_command=f'python3 /var/lib/airflow/script/model_auto_process.py {save_path}',
    dag=dag)

upload_model_toS3 = PythonOperator(
    task_id = 'upload_model_toS3',
    python_callable = upload_model_toS3,
    dag = dag)

upload_tofastAPI = PythonOperator(
    task_id = 'upload_tofastAPI',
    python_callable = upload_tofastAPI,
    dag = dag)

model_fit_save >> upload_model_toS3 >> upload_tofastAPI




