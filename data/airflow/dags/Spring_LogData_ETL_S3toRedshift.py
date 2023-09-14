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
    # 딕셔너리 추출을 위한 정규표현식 패턴
    pattern = r"/{.*/}"
    userid_pattern = r"Authenticated user ID : (\d+)"
    url_pattern = r'\[(.*?)\].*url\s:\s(.*$)'

    user_id_list = []
    url_list = []
    created_date_list = []
    # 로그 파일 열기
    with open(log_file_path, "r") as file:
        logs = file.readlines()
        skip_line = False  # 플래그 변수

        for line in logs:
            if skip_line:  # 이전 라인에서 user_id를 찾았을 경우
                matches = re.findall(url_pattern, line, flags=re.MULTILINE)
                
                # 변수 설정
                created_date = matches[0][0]
                url = matches[0][1]
                
                # 리스트 넣기
                user_id_list.append(user_ids[0])
                url_list.append(url)
                created_date_list.append(created_date)
                
                
                skip_line = False  # 플래그 변수 재설정
                continue

            user_ids = re.findall(userid_pattern, line)
            if len(user_ids) == 1:
                skip_line = True  # 다음 라인에서 url과 관련된 코드 처리
    
    # 데이터 생성
    data = {'user_id' : user_id_list, 'url' : url_list, 'created_date' : created_date_list}
    df = pd.DataFrame(data)
    
    # 해당 문자열이 포함된 행 삭제
    df = df[~df['url'].str.contains('insert|delete|modify|like|log')]

    # url 컬럼에서 숫자 제거하고 id 컬럼 생성
    df['id'] = df['url'].apply(lambda x: re.search(r'\d+$', x).group() if re.search(r'\d+$', x) else None)
    df['url'] = df['url'].apply(lambda x: re.sub(r'/\d+$', '', x))

    df = df.reset_index(drop = True)
    df = df[['user_id', 'url', 'id', 'created_date']]
    
    # 서울 시간으로 변환
    # seoul_timezone = timezone('Asia/Seoul')
    df['created_date'] = pd.to_datetime(df['created_date'])
    # df['created_date'] = df['created_date'].dt.tz_localize('UTC').dt.tz_convert(seoul_timezone).dt.strftime('%Y-%m-%d %H:%M:%S')
    return df


def Spring_Log_Upload_toS3(**context):
    try:
        # execution_date = context["execution_date"].strftime("%Y-%m-%d")
        execution_date = '2023-06-27'
        url = f"http://3.38.21.116:8000/log/{execution_date}"
        # params = {
        # "date": execution_date
        
        response = requests.get(url)
        result = response.json()
        
        if result['message'] == 'Success':
            logging.info('Spring logdata upload to s3 Success')

        else :
            raise
        
    except Exception as e:
        logging.error(e)
        raise

def Processing_log_data_toS3(**context):
    execution_date = context["execution_date"].strftime("%Y%m%d")
    execution_date = '20230627'
        
    # S3 버킷 연결
    bucket = 'standupseoul'
    s3_hook = S3Hook(bucket)
    
    # S3 key, 로그데이터 get
    s3_key = f"raw/spring_logs/spring_{execution_date}.log"
    s3_object = s3_hook.get_key(bucket_name=bucket, key=s3_key)
    logdata= s3_object.get()['Body'].read().decode('utf-8')
    
    # 로그 데이터 가공
    df = preprocessing_logdata(logdata)
    
    # 가공된 데이터프레임을 S3에 업로드
    s3_key = f'processing/spring_logs/spring_{execution_date}.csv'
    s3_hook.load_string(
        df.to_csv(index=False, encoding = 'utf-8-sig', header = False),
        key=s3_key,
        bucket_name=bucket,
        replace=True
    )
    
    

dag = DAG(
    dag_id = 'Spring_LogData_ETL_S3toRedshift',
    start_date = datetime(2023, 6, 20, 12, 0, 0),
    schedule_interval='@once',
    # schedule_interval='15 15 * * *',  # 한국 시간 기준 00시 15분에 작업 실행
    max_active_runs = 1,
    catchup = False,
    default_args = {
        'retries': 1,
        'retry_delay': timedelta(minutes=1),
        'on_failure_callback': slack.on_failure_callback
    }
)


Spring_Log_Upload_toS3 = PythonOperator(
    task_id = 'Spring_Log_Upload_toS3',
    python_callable = Spring_Log_Upload_toS3,
    dag = dag)

Processing_log_data_toS3 = PythonOperator(
    task_id = 'Processing_log_data_toS3',
    python_callable = Processing_log_data_toS3,
    dag = dag)

s3_to_redshift = S3ToRedshiftOperator(
        task_id = f's3_to_redshift_springlogs',
        s3_bucket = 'standupseoul',
        s3_key = 'processing/spring_logs/Spring_{{ execution_date.strftime("%Y%m%d") }}.csv',
        schema = '"raw"',
        table = '"spring_log"',
        copy_options=['csv'],
        method = 'UPSERT',
        upsert_keys = ["user_id", "created_date"],
        redshift_conn_id = "redshift_dev_db",
        dag = dag
    )

Spring_Log_Upload_toS3 >> Processing_log_data_toS3 >> s3_to_redshift