import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
import pymysql
import requests

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
    
    
df = pd.read_csv('C:/last_project/Place_kakao/data/hotplaces.csv')

# 가공
df = df[['id', 'addr1', 'addr2', 'contentid', 'contenttypeid', 'mapx', 'mapy','title', 'subway', 'file_name']]
df['addr'] = df['addr1'].fillna('') + ' ' + df['addr2'].fillna('')
df['file_name'] = 'https://standupseoul.s3.ap-northeast-2.amazonaws.com/hotplaces/' + df['file_name'] 
df.rename(columns={'contentid': 'content_id', 'contenttypeid': 'content_type_id', 'subway': 'subway_id'}, inplace=True)
df = df.drop(columns = ['addr1', 'addr2'])

# 이미지 없는 것 제외
df = df[~df['file_name'].isnull()]

# subway_id 변경
sub = pd.read_csv('C:/last_project/Place_kakao/data/subway_202306040521.csv')
df['subway_id'] = df['subway_id'].map(sub.set_index('subway_nm')['id'])

uploadToMysql(df, 'hotplaces')