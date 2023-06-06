from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.models import Variable
from plugins import slack
from airflow.providers.mysql.hooks.mysql import MySqlHook
from airflow.providers.amazon.aws.hooks.s3 import S3Hook
from datetime import datetime, timedelta
import xml.etree.ElementTree as ET
import xml.dom.minidom
import time
import sys
import requests
import logging
import os
import pytz


def load_xml_from_s3(s3_hook, bucket_name, key):
    xml_data = s3_hook.read_key(key, bucket_name)
    return xml_data
    
def population_transform_load(**context):

    # Seoulcity_RawData_E_toS3 dag로부터 전달받은 exectuion_date 변환
    seoul_timezone = pytz.timezone('Asia/Seoul')
    
    # # backfill용 코드
    # execution_date = datetime(2023, 6, 3, 19, 30)
    
    # dag에서 가져온 execution_date
    execution_date = context['dag_run'].conf.get('execution_date')
    execution_date = datetime.fromisoformat(execution_date).astimezone(seoul_timezone)
    
    ymd_format = execution_date.strftime("%Y%m%d")
    ymdhm_format = execution_date.strftime("%Y%m%d%H%M")

    # Connect to S3
    bucket_name = 'standupseoul'
    s3_hook = S3Hook(bucket_name) 
    
    
    # Connection to Mysql
    mysql_hook = MySqlHook(mysql_conn_id="MySQL_RDS")
    conn = mysql_hook.get_conn()
    cur = conn.cursor()

    try:
        cur.execute("BEGIN;")
        # places
        with open('/var/lib/airflow/data/서울시 주요 48장소.txt', 'r') as file:
            for place in file:
                place = place.strip()
                key = f'seoulcity/seoulcity_{ymd_format}/seoulcity_{ymdhm_format}/seoulcity_{place}_{ymdhm_format}.xml'
                xml_data = load_xml_from_s3(s3_hook, bucket_name, key)

                # Parse the XML data
                root = ET.fromstring(xml_data)
                
                # Extract + Transform
                area_nm = root.find('CITYDATA/AREA_NM').text
                
                # 결과 가져오기
                cur.execute(f"select id from place where area_nm = '{place}';")
                result = cur.fetchone()
                if result:
                    place_id = result[0]
                    logging.info(f"Place ID: {place_id}")
                else:
                    logging.info('There is no place_id')
                    raise
                
                area_congest_lvl = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/AREA_CONGEST_LVL').text
                
                # 결과 가져오기
                cur.execute(f"select id from population_congest_msg where area_congest_lvl = '{area_congest_lvl}';")
                result = cur.fetchone()
                if result:
                    area_congest_id = result[0]
                    logging.info(f"area_congest_id: {area_congest_id}")
                else:
                    logging.info('There is no area_congest_id')
                    raise
                
                # area_congest_msg = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/AREA_CONGEST_MSG').text
                area_ppltn_min = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/AREA_PPLTN_MIN').text
                area_ppltn_max = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/AREA_PPLTN_MAX').text
                male_ppltn_rate = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/MALE_PPLTN_RATE').text
                female_ppltn_rate = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/FEMALE_PPLTN_RATE').text
                ppltn_rate_0 = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/PPLTN_RATE_0').text
                ppltn_rate_10 = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/PPLTN_RATE_10').text
                ppltn_rate_20 = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/PPLTN_RATE_20').text
                ppltn_rate_30 = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/PPLTN_RATE_30').text
                ppltn_rate_40 = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/PPLTN_RATE_40').text
                ppltn_rate_50 = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/PPLTN_RATE_50').text
                ppltn_rate_60 = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/PPLTN_RATE_60').text
                ppltn_rate_70 = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/PPLTN_RATE_70').text
                resnt_ppltn_rate = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/RESNT_PPLTN_RATE').text
                non_resnt_ppltn_rate = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/NON_RESNT_PPLTN_RATE').text
                ppltn_time = root.find('CITYDATA/LIVE_PPLTN_STTS/LIVE_PPLTN_STTS/PPLTN_TIME').text
                created_date = execution_date
                
                # INSERT(Load)
                sql = '''
                    INSERT INTO population
                    (place_id, area_congest_id, area_ppltn_min,
                    area_ppltn_max,male_ppltn_rate, female_ppltn_rate,ppltn_rate_0,
                    ppltn_rate_10,ppltn_rate_20,ppltn_rate_30,ppltn_rate_40,
                    ppltn_rate_50,ppltn_rate_60,ppltn_rate_70,resnt_ppltn_rate,
                    non_resnt_ppltn_rate, ppltn_time, created_date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                    '''
                    
                params = (place_id, area_congest_id, area_ppltn_min, area_ppltn_max,male_ppltn_rate, female_ppltn_rate,ppltn_rate_0,ppltn_rate_10,ppltn_rate_20,ppltn_rate_30,ppltn_rate_40,ppltn_rate_50,ppltn_rate_60,ppltn_rate_70,resnt_ppltn_rate, non_resnt_ppltn_rate, ppltn_time, created_date)
                cur.execute(sql, params)
                logging.info("%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s",
                                place_id, area_congest_id, area_ppltn_min, area_ppltn_max,male_ppltn_rate, 
                                female_ppltn_rate,ppltn_rate_0,ppltn_rate_10,ppltn_rate_20,ppltn_rate_30,ppltn_rate_40,
                                ppltn_rate_50,ppltn_rate_60,ppltn_rate_70,resnt_ppltn_rate, non_resnt_ppltn_rate, ppltn_time, created_date)
        cur.execute("COMMIT;")
        logging.info(f'{datetime.now} Population etl process sucess')
    except Exception as e:
        cur.execute('ROLLBACK;')
        logging.error('An error occured : %s', e)
        raise
    
dag = DAG(
    dag_id = 'Seoulcity_Population_TL_S3toMySQL',
    start_date = datetime(2023, 5, 25, 12, 0, 0),  # UTC 기준으로 5월 25일 12시로 설정
    schedule_interval= '@once',  # 매 30분마다 실행
    max_active_runs = 1,
    catchup = False,
    default_args = {
        # 'retries': 1,
        # 'retry_delay': timedelta(minutes=1),
        'on_failure_callback': slack.on_failure_callback
    }
)

population_transform_load = PythonOperator(
    task_id = 'population_transform_load',
    python_callable = population_transform_load,
    dag = dag)