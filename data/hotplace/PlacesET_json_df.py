import requests
import json
import pandas as pd
import os
import seoul00api
import logging

''' log '''
filePath, fileName = os.path.split(__file__)
log_folder = "./logs"
os.makedirs(log_folder, exist_ok=True)
log_file = os.path.join(log_folder, f"{fileName.replace('.py','')}.log")
logging.basicConfig(filename=log_file, level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def search_place(mapX, mapY, contentTypeId):
    url = 'http://apis.data.go.kr/B551011/KorService1/locationBasedList1'
    params = {'numOfRows': 100,
        'MobileOS' : 'WIN',
        'MobileApp' : 'StandUP',
        'mapX' : mapX,
        'mapY' : mapY,
        'radius' : 1000,
        '_type' : 'json',
        'contentTypeId' : contentTypeId,
        'serviceKey' : seoul00api.api()}
    data = requests.get(url, params = params)
    return data

def detail_search(contentId, contentTypeId):
    url = 'http://apis.data.go.kr/B551011/KorService1/detailIntro1'
    params = {'numOfRows': 100,
        'MobileOS' : 'WIN',
        'MobileApp' : 'StandUP',
        '_type' : 'json',
        'contentId' : contentId, 
        'contentTypeId' : contentTypeId,
        'serviceKey' : seoul00api.api()}
    data = requests.get(url, params = params)
    return data.json()


def extract_json(contentTypeId):
    df = pd.read_csv(os.path.join(filePath, 'data', 'place_subway_info.csv'))
    # df = pd.read_csv(os.path.join('.', 'data', 'place_subway_info.csv'))
    df = df[['SUB_STN_NM', 'SUB_STN_X', 'SUB_STN_Y']].drop_duplicates(subset = 'SUB_STN_NM').reset_index(drop = True)


    final_items = []
    cnt = 1
    for idx in df.index:
        subway_NM = df.loc[idx, 'SUB_STN_NM']
        mapX = df.loc[idx, 'SUB_STN_X']
        mapY = df.loc[idx, 'SUB_STN_Y']
        
        # # contentTypeId 관광타입(12:관광지,14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)
        items = search_place(mapX, mapY, contentTypeId)
        try:
            items = items.json()
            items = items['response']['body']['items']['item']
            logging.info(f'{subway_NM}역 {len(items)}개 추출')
            for item in items:
                item['id'] = cnt
                item['subway'] = subway_NM
                item['id'] = cnt
                final_items.append(item)
                cnt += 1
        except Exception as E:
            logging.info(f'{subway_NM}역')
            logging.info(E)
            
    return final_items

def main():
    # 두 개 추출(관광지, 문화시설)
    final_list1 = extract_json(12)
    final_list2 = extract_json(14)

    # final_list 제작
    final_list1.extend(final_list2)
    for idx, i in enumerate(final_list1):
        i['id'] = idx

    # 딕셔너리 데이터를 JSON 파일로 저장
    with open(os.path.join(filePath, 'data', 'hotplaces.json'), 'w', encoding='utf-8') as file:
        json.dump(final_list1, file, indent=4, ensure_ascii=False)
        df = pd.DataFrame(final_list1)
        df['file_name'] = df['id'].astype(str) + '.jpg'
        df.to_csv(os.path.join(filePath, 'data', 'hotplaces.csv'), encoding = 'utf-8-sig', index = False)
        
if __name__ == '__main__':
    main()        
    