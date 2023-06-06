from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.trigger_dagrun import TriggerDagRunOperator
from airflow.hooks.S3_hook import S3Hook
from airflow.models import Variable
from datetime import datetime, timedelta
from plugins import slack
import requests
import logging
import os
import pytz


def extract(**context):
    # seoul 타임존 객체 생성
    seoul_timezone = pytz.timezone('Asia/Seoul')
    
    # 실행 날짜 및 시간 가져오기
    execution_date = context['execution_date'].astimezone(seoul_timezone)
    ymd_format = execution_date.strftime("%Y%m%d")
    ymdhm_format = execution_date.strftime("%Y%m%d%H%M")
    
    # api_key
    api_key = Variable.get("seoul_api_key")

    # S3 버킷 연결
    bucket = 'standupseoul'
    s3_hook = S3Hook(bucket)
    
    # API로 데이터 가져오기
    with open('/var/lib/airflow/data/서울시 주요 48장소.txt', 'r') as file:
        try:
            for place in file:
                place = place.strip()
                url = f'http://openapi.seoul.go.kr:8088/{api_key}/xml/citydata/1/5/{place}'

                # API 요청 보내기
                response = requests.get(url)
                if response.status_code == 200:
                    data = response.text

                    # 데이터 저장
                    filename = f'/var/lib/airflow/data/seoulcity_{place}_{ymdhm_format}.xml'
                    with open(filename, 'w') as file:
                        file.write(data)


                    # S3로 파일 업로드
                    s3_key = f'seoulcity/seoulcity_{ymd_format}/seoulcity_{ymdhm_format}/seoulcity_{place}_{ymdhm_format}.xml'
                    s3_hook.load_file(filename=filename, key=s3_key, bucket_name=bucket)
                    logging.info(f'{s3_key} upload to S3 Success')

                    # 로컬 파일 삭제
                    os.remove(filename)
                    
                else :
                    logging.info(f'response status_code is {response.status_code}')
                    raise
                    
        except Exception as e:
            logging.error('An error occured : %s', e)
            raise

dag = DAG(
    dag_id = 'Seoulcity_RawData_E_toS3',
    start_date = datetime(2023, 5, 25, 12, 0, 0),  # UTC 기준으로 5월 25일 12시로 설정
    schedule_interval= "*/30 * * * *", 
    max_active_runs = 1,
    catchup = False,
    default_args = {
        # 'retries': 1,
        # 'retry_delay': timedelta(minutes=1),
        'on_failure_callback': slack.on_failure_callback
    }
)

extract = PythonOperator(
    task_id = 'extract',
    python_callable = extract,
    dag = dag)

population_trigger = TriggerDagRunOperator(
    task_id="population_trigger",
    trigger_dag_id = "Seoulcity_Population_TL_S3toMySQL",
    wait_for_completion=True,
    conf={'execution_date': '{{ execution_date }}'},  # execution_date를 인자로 전달
    dag = dag
)

weather_trigger = TriggerDagRunOperator(
    task_id="weather_trigger",
    trigger_dag_id = "Seoulcity_Weather_TL_S3toMySQL",
    wait_for_completion=True,
    conf={'execution_date': '{{ execution_date }}'},  # execution_date를 인자로 전달
    dag = dag
)


extract >> [population_trigger, weather_trigger]