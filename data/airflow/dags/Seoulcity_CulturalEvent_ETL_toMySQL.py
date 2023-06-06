from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.models import Variable
from airflow.models import XCom
from airflow.providers.mysql.hooks.mysql import MySqlHook
from plugins import slack
import requests
import pandas as pd
import json
from datetime import datetime,timedelta
import logging
import pytz


def mysql_connector():
    # Connection to Mysql
    mysql_hook = MySqlHook(mysql_conn_id="MySQL_RDS")
    conn = mysql_hook.get_conn()
    cur = conn.cursor()
    return conn, cur

def return_district(cur, district):
    cur.execute(f"select id from district where district_nm = '{district}';")
    result = cur.fetchone()
    return result[0]

def transform_data(cur, df):
    try:
        df['STRTDATE'] = pd.to_datetime(df['STRTDATE']) # 'STRTDATE' 열의 데이터를 datetime 형식으로 변환
        df['END_DATE'] = pd.to_datetime(df['END_DATE']) # 'END_DATE' 열의 데이터를 datetime 형식으로 변환

        # 시작날짜가 지금으로부터 14일 뒤까지가 상한, 아직 끝나지 않은 문화행사만 추출
        current_date = datetime.now()
        after_one_month = current_date + timedelta(days=14)
        df = df[(df['END_DATE'] > current_date) & (df['STRTDATE'] < after_one_month)].reset_index(drop = True)

        # 컬럼명 조정
        df.columns = df.columns.str.lower()
        df = df.drop(columns = ['org_name', 'player', 'program', 'date'])
        df = df.rename(columns={'guname': 'district_id'})
        
        # 공백값 삭제
        df = df[df['district_id'] != '']
        df = df.dropna(subset = 'district_id')

        # district_id Mapping
        df['district_id'] = df['district_id'].apply(lambda x : return_district(cur,x))
        return df
    
    except Exception as e:
        logging.info(e)
        raise
    
def etl(**context):
    
    # seoul_timezone 
    seoul_timezone = pytz.timezone('Asia/Seoul')
    
    # connect mysql
    conn, cur = mysql_connector()
    
    try:
        # full refresh
        cur.execute("BEGIN;")         
        cur.execute("DELETE FROM cultural_event;")
        
        # api_key, url setting
        api_key = Variable.get("seoul_api_key")
        url = f'http://openapi.seoul.go.kr:8088/{api_key}/json/culturalEventInfo/1/800/'

        # call api
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()

            # 데이터를 JSON 형식으로 덤프하고 UTF-8로 인코딩하여 출력
            json_data = json.dumps(data, indent=4, ensure_ascii=False)
            data = json.loads(json_data)
            data = data['culturalEventInfo']['row']
            df = pd.DataFrame(data)
            logging.info(df)
            df = transform_data(cur, df)
            
            for idx in df.index:
                codename = df.loc[idx, 'codename']
                district_id = df.loc[idx, 'district_id']
                title = df.loc[idx, 'title']
                place = df.loc[idx, 'place']
                use_trgt = df.loc[idx, 'use_trgt']
                use_fee = df.loc[idx, 'use_fee']
                etc_desc = df.loc[idx, 'etc_desc']
                org_link = df.loc[idx, 'org_link']
                main_img = df.loc[idx, 'main_img']
                rgstdate = df.loc[idx, 'rgstdate']
                ticket = df.loc[idx, 'ticket']
                strtdate = df.loc[idx, 'strtdate']
                end_date = df.loc[idx, 'end_date']
                themecode = df.loc[idx, 'themecode']
                
                # load
                sql = f'''
                    INSERT INTO cultural_event
                    (codename, district_id, title, place, use_trgt, use_fee, etc_desc, org_link, main_img, rgstdate, ticket, strtdate, end_date, themecode)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                    '''
                    
                params = (codename, district_id, title, place, use_trgt, use_fee, etc_desc, org_link, main_img, rgstdate, ticket, strtdate, end_date, themecode)
                cur.execute(sql, params)
                
                logging.info("%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s",
                        codename, district_id, title, place, use_trgt, use_fee, etc_desc, org_link, main_img, rgstdate, ticket, strtdate, end_date, themecode)

            # commit
            cur.execute("COMMIT;")
            logging.info(f'{datetime.now} cultural_event etl process success')
                

        else:
            logging.info(f'request error : {response.status_code}')
            raise
        
    except Exception as e:
        cur.execute('ROLLBACK;')
        logging.error('An error occured : %s', e)
        raise      


dag = DAG(
    dag_id = 'Seoulcity_CulturalEvent_ETL_toMySQL',
    start_date = datetime(2023, 5, 25, 12, 0, 0),  # UTC 기준으로 5월 25일 12시로 설정
    schedule_interval='7 0 * * *',  # 매일 00시 7분에 작업 실행
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

