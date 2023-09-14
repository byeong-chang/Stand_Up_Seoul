from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.amazon.aws.transfers.s3_to_redshift import S3ToRedshiftOperator
from airflow.hooks.S3_hook import S3Hook
from datetime import datetime, timedelta
from plugins import slack
import requests
import logging
import json
import re
import json
import pandas as pd
from pytz import timezone

def preprocessing_logdata(logdata):

    json_list = []
        
    # 줄바꿈 처리
    logdata = logdata.split('\n')
    
    # 로그 데이터를 한 줄씩 처리
    for line in logdata:
        if "{" in line and "}" in line:
            pattern = r"\{(.+?)\}"  # '{'와 '}' 사이의 패턴 정규표현식
            match = re.search(pattern, line)

            if match:
                json_data = match.group(0).replace("'", '"')  # 정규표현식에 매칭된 부분을 추출
                json_data = json.loads(json_data)  # JSON 데이터로 변환
                
                
            datetime_pattern = r"(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})"  # YYYY-MM-DD HH:MM:SS 형식의 날짜와 시간 패턴 정규표현식
            match = re.search(datetime_pattern, line)

            if match:
                date = match.group(1)
                time = match.group(2)
                datetime = f"{date} {time}"
                json_data['predict_time'] = datetime
            
            json_list.append(json_data)
                    
    df = pd.DataFrame(json_list)

    # predict_time 컬럼을 datetime 형식으로 변환
    df['predict_time'] = pd.to_datetime(df['predict_time'])

    # 서울 시간으로 변환
    seoul_timezone = timezone('Asia/Seoul')
    df['predict_time'] = df['predict_time'].dt.tz_localize('UTC').dt.tz_convert(seoul_timezone).dt.strftime('%Y-%m-%d %H:%M:%S')
    
    return df

def FastApi_Log_Upload_toS3(**context):
    try:
        execution_date = context["execution_date"].strftime("%Y%m%d")
        url = "http://3.39.156.163:8000/upload_log_toS3"
        params = {
        "date": execution_date
        }
        
        response = requests.get(url, params = params)
        result = response.json()
        
        if result['message'] == 'Success':
            logging.info('FastAPI logdata upload to s3 Success')

        else :
            raise
        
    except Exception as e:
        logging.error(e)
        raise

def Processing_log_data_toS3(**context):
    execution_date = context["execution_date"].strftime("%Y%m%d")
        
    # S3 버킷 연결
    bucket = 'standupseoul'
    s3_hook = S3Hook(bucket)
    
    # S3 key, 로그데이터 get
    s3_key = f"raw/fastapi_logs/FastAPI_{execution_date}.log"
    s3_object = s3_hook.get_key(bucket_name=bucket, key=s3_key)
    logdata= s3_object.get()['Body'].read().decode('utf-8')
    
    # 로그 데이터 가공
    df = preprocessing_logdata(logdata)
    
    # 가공된 데이터프레임을 S3에 업로드
    s3_key = f'processing/fastapi_logs/FastAPI_{execution_date}.csv'
    s3_hook.load_string(
        df.to_csv(index=False, encoding = 'utf-8-sig', header = False),
        key=s3_key,
        bucket_name=bucket,
        replace=True
    )
    
    

dag = DAG(
    dag_id = 'FastApi_LogData_ETL_S3toRedshift',
    start_date = datetime(2023, 6, 20, 12, 0, 0),
    schedule_interval='10 15 * * *',  # 한국 시간 기준 02시 10분에 작업 실행
    max_active_runs = 1,
    catchup = False,
    default_args = {
        'retries': 1,
        'retry_delay': timedelta(minutes=1),
        'on_failure_callback': slack.on_failure_callback
    }
)


FastApi_Log_Upload_toS3 = PythonOperator(
    task_id = 'FastApi_Log_Upload_toS3',
    python_callable = FastApi_Log_Upload_toS3,
    dag = dag)

Processing_log_data_toS3 = PythonOperator(
    task_id = 'Processing_log_data_toS3',
    python_callable = Processing_log_data_toS3,
    dag = dag)

s3_to_redshift = S3ToRedshiftOperator(
        task_id = f's3_to_redshift_fastapilogs',
        s3_bucket = 'standupseoul',
        s3_key = 'processing/fastapi_logs/FastAPI_{{ execution_date.strftime("%Y%m%d") }}.csv',
        schema = '"raw"',
        table = '"fastapi_log"',
        copy_options=['csv'],
        method = 'UPSERT',
        upsert_keys = ["user_id", "predict_time"],
        redshift_conn_id = "redshift_dev_db",
        dag = dag
    )

FastApi_Log_Upload_toS3 >> Processing_log_data_toS3 >> s3_to_redshift