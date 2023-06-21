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




# Connect to S3
bucket_name = 'standupseoul'
s3_hook = S3Hook(bucket_name) 

# Connection to Mysql
mysql_hook = MySqlHook(mysql_conn_id="MySQL_RDS")
conn = mysql_hook.get_conn()
cur = conn.cursor()
    
    
def load_xml_from_s3(s3_hook, bucket_name, key):
    xml_data = s3_hook.read_key(key, bucket_name)
    return xml_data


def weather_transform_load(**context):
    
    # Seoulcity_RawData_E_toS3 dag로부터 전달받은 exectuion_date 변환
    seoul_timezone = pytz.timezone('Asia/Seoul')
    
    # # backfill용 코드
    # execution_date = datetime(2023, 6, 3, 20, 00)
    
    # dag에서 가져온 execution_date
    execution_date = context['dag_run'].conf.get('execution_date')
    execution_date = datetime.fromisoformat(execution_date).astimezone(seoul_timezone)
    
    ymd_format = execution_date.strftime("%Y%m%d")
    ymdhm_format = execution_date.strftime("%Y%m%d%H%M")
    
    
    try:
        cur.execute("BEGIN;")
        # places
        with open('/var/lib/airflow/data/서울시 주요 48장소.txt', 'r') as file:
            for place in file:
                try:
                    place = place.strip()
                    key = f'seoulcity/seoulcity_{ymd_format}/seoulcity_{ymdhm_format}/seoulcity_{place}_{ymdhm_format}.xml'
                    xml_data = load_xml_from_s3(s3_hook, bucket_name, key)

                    # Parse the XML data
                    root = ET.fromstring(xml_data)
                    
                    # Transform
                    area_nm = root.find('CITYDATA/AREA_NM').text
                    
                    # DB에서 장소 값 매핑
                    cur.execute(f"select id from place where area_nm = '{place}';")
                    result = cur.fetchone()
                    if result:
                        place_id = result[0]
                        logging.info(f"Place ID: {place_id}")
                    else:
                        logging.info('There is no place_id')
                        raise
                    

                    temp = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/TEMP').text
                    sensible_temp = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/SENSIBLE_TEMP').text
                    max_temp = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/MAX_TEMP').text
                    min_temp = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/MIN_TEMP').text
                    humidity = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/HUMIDITY').text
                    wind_dirct = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/WIND_DIRCT').text
                    wind_spd = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/WIND_SPD').text
                    precipitation = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/PRECIPITATION').text
                    precpt_type = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/PRECPT_TYPE').text
                    pcp_msg = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/PCP_MSG').text
                    uv_index_lvl = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/UV_INDEX_LVL').text
                    uv_index = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/UV_INDEX').text
                    uv_msg = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/UV_MSG').text
                    pm25_index = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/PM25_INDEX').text
                    pm25 = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/PM25').text
                    pm10_index = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/PM10_INDEX').text
                    pm10 = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/PM10').text
                    air_idx = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/AIR_IDX').text
                    air_idx_mvl = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/AIR_IDX_MVL').text
                    air_msg = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/AIR_MSG').text
                    weather_time = root.find('CITYDATA/WEATHER_STTS/WEATHER_STTS/WEATHER_TIME').text
                    created_date = execution_date
                    
                    # None 값 넣지 않기 위해 에러 발생 코드 작성
                    if None in [place_id, temp, sensible_temp, max_temp, min_temp, humidity, wind_dirct, wind_spd, 
                                precipitation, precpt_type, pcp_msg, uv_index_lvl, uv_index, uv_msg, pm25_index,
                                pm25, pm10_index, pm10, air_idx, air_idx_mvl, air_msg, weather_time, created_date]:
                        raise ValueError('One or more values are None')  # 하나라도 None일 경우 에러 발생
                    
                    # INSERT(Load)
                    sql = '''
                        INSERT INTO weather
                        (place_id, temp, sensible_temp, max_temp, min_temp, humidity, wind_dirct, wind_spd, 
                        precipitation, precpt_type, pcp_msg, uv_index_lvl, uv_index, uv_msg, pm25_index,
                        pm25, pm10_index, pm10, air_idx, air_idx_mvl, air_msg, weather_time, created_date)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                        '''
                        
                    params = (place_id, temp, sensible_temp, max_temp, min_temp, humidity, wind_dirct, wind_spd, 
                                precipitation, precpt_type, pcp_msg, uv_index_lvl, uv_index, uv_msg, pm25_index,
                                pm25, pm10_index, pm10, air_idx, air_idx_mvl, air_msg, weather_time, created_date)
                    cur.execute(sql, params)
                    logging.info("%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s",
                                place_id, temp, sensible_temp, max_temp, min_temp, humidity, wind_dirct, wind_spd, 
                                precipitation, precpt_type, pcp_msg, uv_index_lvl, uv_index, uv_msg, pm25_index,
                                pm25, pm10_index, pm10, air_idx, air_idx_mvl, air_msg, weather_time, created_date)
                
                # 각 for문 별 예외처리 추가(슬랙 메세지, 에러 로그 추가)
                except Exception as e:
                    error_message = f"Warning - Weather : An error occurred for place '{place}':\n```\n{e}\n```"
                    slack.send_message_to_a_slack_channel(error_message, ":scream:")
                    logging.error('Warning : An error occurred for place %s: %s', place, e)
                    continue
                
        cur.execute("COMMIT;")
        logging.info(f'{datetime.now} Weather transform, load process sucess')
        
    except Exception as e:
        cur.execute('ROLLBACK;')
        logging.error('An error occured : %s', e)
        raise



def weatherfcst_transform_load(**context):
    
    # Seoulcity_RawData_E_toS3 dag로부터 전달받은 exectuion_date 변환
    seoul_timezone = pytz.timezone('Asia/Seoul')
    
    # # backfill용 코드
    # execution_date = datetime(2023, 6, 3, 20, 00)
    
    # # dag에서 가져온 execution_date
    execution_date = context['dag_run'].conf.get('execution_date')
    execution_date = datetime.fromisoformat(execution_date).astimezone(seoul_timezone)
    
    ymd_format = execution_date.strftime("%Y%m%d")
    ymdhm_format = execution_date.strftime("%Y%m%d%H%M")
    
    try:
        cur.execute("BEGIN;")
        
        # full refresh
        cur.execute("DELETE FROM weather_fcst;")
        
        # places
        with open('/var/lib/airflow/data/서울시 주요 48장소.txt', 'r') as file:
            for place in file:
                place = place.strip()
                key = f'seoulcity/seoulcity_{ymd_format}/seoulcity_{ymdhm_format}/seoulcity_{place}_{ymdhm_format}.xml'
                xml_data = load_xml_from_s3(s3_hook, bucket_name, key)

                # Parse the XML data
                root = ET.fromstring(xml_data)
                
                # Transform
                area_nm = root.find('CITYDATA/AREA_NM').text
                
                # DB에서 장소 값 매핑
                cur.execute(f"select id from place where area_nm = '{place}';")
                result = cur.fetchone()
                if result:
                    place_id = result[0]
                    logging.info(f"Place ID: {place_id}")
                else:
                    logging.info('There is no place_id')
                    raise
                
                # time format
                time_format = "%Y%m%d%H%M" 
                
                # Extract + Transform
                fcst24hours = root.findall('CITYDATA/WEATHER_STTS/WEATHER_STTS/FCST24HOURS/FCST24HOURS')
                for hour in fcst24hours:
                    
                    # 문자열을 시간 형식으로 변환
                    fcst_dt = hour.find('FCST_DT').text
                    fcst_dt = datetime.strptime(fcst_dt, time_format)
                    
                    temp = hour.find('TEMP').text
                    precipitation = hour.find('PRECIPITATION').text
                    precpt_type = hour.find('PRECPT_TYPE').text
                    rain_chance = hour.find('RAIN_CHANCE').text
                    sky_stts = hour.find('SKY_STTS').text
                    created_date = execution_date
                
                    # INSERT(Load)
                    sql = '''
                        INSERT INTO weather_fcst
                        (place_id, fcst_dt, temp, precipitation, precpt_type, rain_chance, sky_stts, created_date)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
                        '''
                        
                    params = (place_id, fcst_dt, temp, precipitation, precpt_type, rain_chance, sky_stts, created_date)
                    cur.execute(sql, params)
                    logging.info("%s %s %s %s %s %s %s %s",
                                place_id, fcst_dt, temp, precipitation, precpt_type, rain_chance, sky_stts, created_date)
            
        cur.execute("COMMIT;")
        logging.info(f'{datetime.now} WeatherFcst transform, load process sucess')
        
    except Exception as e:
        cur.execute('ROLLBACK;')
        logging.error('An error occured : %s', e)
        raise
    
           
dag = DAG(
    dag_id = 'Seoulcity_Weather_TL_S3toMySQL',
    start_date = datetime(2023, 5, 25, 12, 0, 0),  # UTC 기준으로 5월 25일 12시로 설정
    schedule_interval= '@once',
    max_active_runs = 1,
    catchup = False,
    default_args = {
        'retries': 1,
        'retry_delay': timedelta(minutes=1),
        'on_failure_callback': slack.on_failure_callback
    }
)

weather_transform_load = PythonOperator(
    task_id = 'weather_transform_load',
    python_callable = weather_transform_load,
    dag = dag)

weatherfcst_transform_load = PythonOperator(
    task_id = 'weatherfcst_transform_load',
    python_callable = weatherfcst_transform_load,
    dag = dag)

weather_transform_load >> weatherfcst_transform_load