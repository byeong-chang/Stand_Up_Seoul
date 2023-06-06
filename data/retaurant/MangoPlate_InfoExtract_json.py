import requests
from bs4 import BeautifulSoup
import os
import logging
import pandas as pd
import re
from datetime import datetime
import json

filePath, fileName = os.path.split(__file__)

''' log '''
log_folder = "./logs"
os.makedirs(log_folder, exist_ok=True)
log_file = os.path.join(log_folder, f"{fileName.replace('.py','')}.log")
logging.basicConfig(filename=log_file, level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def restaurant_extract(url, id, subway):
    # Send a GET request to the URL
    response = requests.get(url, headers={'User-Agent': 'Chrome'})

    # Create a BeautifulSoup object
    soup = BeautifulSoup(response.text, "html.parser")

    # 식당 이름
    title_element = soup.select_one('body > main > article > div.column-wrapper > div.column-contents > div > section.restaurant-detail > header > div.restaurant_title_wrap > span > h1')
    title = title_element.text.strip() if title_element else ""

    shop_info = soup.select_one('body > main > article > div.column-wrapper > div.column-contents > div > section.restaurant-detail > table')

    # 주소 추출
    address_th = shop_info.find('th', string='주소')
    address = address_th.find_next_sibling('td').get_text(strip=True, separator='|') if address_th else ""
    # 주소를 분리하여 딕셔너리로 저장
    address_parts = address.split('|')
    new_address = address_parts[0]
    old_address = address_parts[2] if len(address_parts) > 2 else ""

    address_dict = {
        'new_address': new_address,
        'old_address': old_address
    }

    # 전화번호 추출
    callnumber_th = shop_info.find('th', string='전화번호')
    call_number = callnumber_th.find_next_sibling('td').get_text(strip=True, separator='|') if callnumber_th else ""

    # 음식종류
    food_kind_th = shop_info.find('th', string='음식 종류')
    food_kind = food_kind_th.find_next_sibling('td').get_text(strip=True, separator='|') if food_kind_th else ""

    # 주차
    parking_th = shop_info.find('th', string='주차')
    parking = parking_th.find_next_sibling('td').get_text(strip=True, separator='|') if parking_th else ""

    # 영업시간
    run_time_th = shop_info.find('th', string='영업시간')
    run_time = run_time_th.find_next_sibling('td').get_text(strip=True, separator='|') if run_time_th else ""
    
    # 쉬는시간
    break_time_th = shop_info.find('th', string='쉬는시간')
    break_time = break_time_th.find_next_sibling('td').get_text(strip=True, separator='|') if break_time_th else ""

    # 휴일
    holiday_th = shop_info.find('th', string='휴일')
    holiday = holiday_th.find_next_sibling('td').get_text(strip=True, separator='|') if holiday_th else ""

    # 웹사이트 링크
    website_th = shop_info.find('th', string='웹 사이트')
    website = website_th.find_next_sibling('td').find('a')['href'] if website_th else ""
    
    # 메뉴
    menu_dict = {}
    menu_th = shop_info.find('th', string='메뉴')
    menu_items = menu_th.find_next_sibling('td').find_all('li', class_='Restaurant_MenuItem') if menu_th else ""
    if menu_items != '':
        for item in menu_items:
            menu = item.find('span', class_='Restaurant_Menu').text
            price = item.find('span', class_='Restaurant_MenuPrice').text
            # # 정규 표현식을 사용하여 숫자만 추출
            price = int(''.join(re.findall(r'\d+', price)))
            menu_dict[menu] = price
    else :
        menu_dict = ''

    # 이미지 링크
    image_link_element = soup.select_one('body > main > article > aside.restaurant-photos > div > figure:nth-child(1) > meta')
    image_link = image_link_element['content'] if image_link_element else ""
    
    # 파일 이름
    if image_link != "" :
        file_name = str(id) + '.jpg'
    else :
        file_name = ""
        
    logging.info(f'{title} info Extract Success')
    
    result = {'id' : id,
            'title' : title,
            'address' : address_dict,
            'call_number' : call_number,
            'food_kind' : food_kind,
            'parking' : parking,
            'run_time' : run_time,
            'break_time' : break_time,
            'holiday' : holiday,
            'website' : website,
            'image_link' : image_link,
            'menu' : menu_dict,
            'subway' : subway[:-1],
            'file_name' : file_name}

    return result

def main():
    # 맛집 정보를 담을 리스트
    restaurant_list = []
    
    df = pd.read_csv(os.path.join(filePath, 'data', '지하철역맛집정보링크.csv')).reset_index(drop = True)
    for idx, url in enumerate(df['link']):
        data = restaurant_extract(url, idx, df.loc[idx, 'subway'])
        restaurant_list.append(data)
        logging.info(data)
        
    # JSON 파일에 맛집 정보 저장
    with open(os.path.join(filePath, 'data', '지하철역별맛집정보최종.json'), 'w', encoding='utf-8') as file:
        json.dump(restaurant_list, file, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    main()