import requests
import json
from plugins import db_connector
from plugins import seoupl00api
import pandas as pd
import json


def detail_search(contentId, contentTypeId):
    url = 'http://apis.data.go.kr/B551011/KorService1/detailIntro1'
    params = {'numOfRows': 100,
        'MobileOS' : 'WIN',
        'MobileApp' : 'StandUP',
        '_type' : 'json',
        'contentId' : contentId, 
        'contentTypeId' : contentTypeId,
        'serviceKey' : seoupl00api.apikey()}
    data = requests.get(url, params = params)
    # return data.text
    return data.json()['response']['body']['items']['item'][0]

def call_df():
    # 0 : id, 1 : content_id , 2 : content_type_id
    conn, cursor = db_connector.mysql()
    cursor.execute('select id, content_id, content_type_id from hotplaces;')
    df = pd.DataFrame(cursor.fetchall())
    return df

def main():
    df = call_df()
    df = df.tail(700)

    info_list = []  # 빈 리스트 생성

    for idx in df.index:
        try:
            id = int(df.loc[idx, 0])
            content_id = int(df.loc[idx, 1])
            content_type_id = int(df.loc[idx, 2])
            info = detail_search(content_id, content_type_id)
            info['id'] = id
            
            info_list.append(info)  # JSON 데이터를 리스트에 추가
        except Exception as e:
            print(e)
            pass
        
    # JSON 데이터를 파일로 저장
    # (api 호출이 하루당 1000개 제한)
    with open('./data/hotplaces_detail.json', 'w') as file:
        json.dump(info_list, file)

if __name__ == '__main__':
    main()     