from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.models import Variable
from airflow.providers.mysql.hooks.mysql import MySqlHook
from plugins import slack
import requests
import pytz
from datetime import datetime, timedelta
import pandas as pd
import logging

def mysql_connector():
    # Connection to Mysql
    mysql_hook = MySqlHook(mysql_conn_id="MySQL_RDS")
    conn = mysql_hook.get_conn()
    cur = conn.cursor()
    return conn, cur

def etl(**context):
    
    # mysql
    conn, cur = mysql_connector()
    
    # 서울 시간대 설정
    seoul_timezone = pytz.timezone('Asia/Seoul')
    
    # 현재 서울 시간의 YYYYMMDD 형식으로 base_date 생성
    base_date = datetime.now(seoul_timezone).strftime('%Y%m%d')
    
    url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'

    params ={'serviceKey' : Variable.get("weather_api_key"),
            'pageNo' : '1',
            'numOfRows' : '1000',
            'dataType' : 'JSON',
            'base_date' : base_date , #오늘날짜 YYYYMMDD
            'base_time' : '0200', # 0200 고정
            'nx' : '37', ## 서울 위경도
            'ny' : '127' }

    response = requests.get(url, params=params, verify=False)
    data = response.json()

    # 데이터프레임으로
    df = pd.DataFrame(data['response']['body']['items']['item'])

    # PCP : 1시간 강수량, REH : 습도(%), WSD : 풍속(m/s), TMP : 온도
    df = df[df['category'].isin(['TMP','PCP', 'REH', 'WSD'])].reset_index(drop = True)

    # 강수없음 강수량 0으로 조정
    df.loc[df['fcstValue'] == '강수없음', 'fcstValue'] = 0

    # fcstTime 정수 값으로 조정
    df['fcstTime']= df['fcstTime'].apply(lambda x: datetime.strptime(x, "%H%M").hour)

    # 필요없는 컬럼 삭제
    df = df.drop(columns = ['baseTime', 'nx', 'ny'])
    
    # 데이터 weather_fcst_3days 테이블로 로드
    try:
        cur.execute('BEGIN;')
        cur.execute('DELETE FROM weather_fcst_3days;')
        
        for idx in df.index:
            baseDate = df.at[idx, 'baseDate']
            category = df.at[idx, 'category']
            fcstDate = df.at[idx, 'fcstDate']
            fcstTime = df.at[idx, 'fcstTime']
            fcstValue = df.at[idx, 'fcstValue']
            
            sql = '''
                INSERT INTO weather_fcst_3days
                (baseDate, category, fcstDate,
                fcstTime,fcstValue) VALUES (%s, %s, %s, %s, %s);
                '''
            params = (baseDate, category, fcstDate, fcstTime, fcstValue)
            cur.execute(sql, params)
            logging.info("%s, %s, %s, %s, %s", baseDate, category, fcstDate, fcstTime, fcstValue)
            
        cur.execute('COMMIT;')
        
    except Exception as e:
        cur.execute('ROLLBACK;')
        logging.error('An error occured : %s', e)
        raise
        

dag = DAG(
    dag_id = 'Weather_Fcst_3days_etl',
    start_date = datetime(2023, 6, 20, 12, 0, 0),
    schedule_interval='50 16 * * *',  # 한국 시간 기준 01시 50분에 작업 실행
    max_active_runs = 1,
    catchup = False,
    default_args = {
        'retries': 1,
        'retry_delay': timedelta(minutes=1),
        'on_failure_callback': slack.on_failure_callback
    }
)

etl = PythonOperator(
    task_id = 'etl',
    python_callable = etl,
    dag = dag)