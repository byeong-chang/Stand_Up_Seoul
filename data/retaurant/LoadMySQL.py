import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
import pymysql

filePath, fileName = os.path.split(__file__)

def uploadToMysql(df, table_name):
    # MySQL 데이터베이스 연결 정보 설정
    host = 'host'  # 호스트 주소
    port = 'port'  # 포트 번호
    database = 'db'  # 데이터베이스 이름
    username = 'id'  # 사용자 이름
    password = 'password'  # 비밀번호

    # SQLAlchemy를 사용하여 MySQL 데이터베이스에 연결
    engine = create_engine(f"mysql+pymysql://{username}:{password}@{host}:{port}/{database}")

    # DataFrame을 저장할 테이블 이름
    table_name = table_name

    # DataFrame을 MySQL 데이터베이스에 저장
    df.to_sql(name=table_name, con=engine, if_exists='append', index=False)

# 맛집정보
df = pd.read_csv(os.path.join(filePath, 'data', '지하철역별맛집정보최종_20230531.csv'))
uploadToMysql(df, table_name)

# 운영 시간
run_time = pd.read_csv(os.path.join(filePath, 'data', '지하철역별맛집운영시간_20230531.csv'))
table_name = 'restaurant_runtime'
uploadToMysql(run_time, table_name)

# 휴무 시간
break_time = pd.read_csv(os.path.join(filePath, 'data', '지하철역별맛집휴식시간_20230531.csv'))
table_name = 'restaurant_breaktime'
uploadToMysql(break_time, table_name)

