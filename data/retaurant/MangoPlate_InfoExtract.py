import requests
from bs4 import BeautifulSoup
import os
import logging
import pandas as pd

''' log '''
log_folder = "./logs"
os.makedirs(log_folder, exist_ok=True)
log_file = os.path.join(log_folder, "MangoPlate_InfoExtract.log")
logging.basicConfig(filename=log_file, level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def restaurant_extract(url):
    # Send a GET request to the URL
    response = requests.get(url, headers={'User-Agent': 'Chrome'})

    # Create a BeautifulSoup object
    soup = BeautifulSoup(response.text, "html.parser")

    # 식당 이름
    title_element = soup.select_one('body > main > article > div.column-wrapper > div.column-contents > div > section.restaurant-detail > header > div.restaurant_title_wrap > span > h1')
    title = title_element.text.strip() if title_element else ""

    shop_info = soup.select_one('body > main > article > div.column-wrapper > div.column-contents > div > section.restaurant-detail > table')

    # 주소 추출
    address_th = shop_info.find('th', text='주소')
    address = address_th.find_next_sibling('td').get_text(strip=True, separator='||') if address_th else ""

    # 전화번호 추출
    callnumber_th = shop_info.find('th', text='전화번호')
    call_number = callnumber_th.find_next_sibling('td').get_text(strip=True, separator='||') if callnumber_th else ""

    # 음식종류
    food_kind_th = shop_info.find('th', text='음식 종류')
    food_kind = food_kind_th.find_next_sibling('td').get_text(strip=True, separator='||') if food_kind_th else ""

    # 주차
    parking_th = shop_info.find('th', text='주차')
    parking = parking_th.find_next_sibling('td').get_text(strip=True, separator='||') if parking_th else ""

    # 영업시간
    run_time_th = shop_info.find('th', text='영업시간')
    run_time = run_time_th.find_next_sibling('td').get_text(strip=True, separator='||') if run_time_th else ""

    # 쉬는시간
    break_time_th = shop_info.find('th', text='쉬는시간')
    break_time = break_time_th.find_next_sibling('td').get_text(strip=True, separator='||') if break_time_th else ""

    # 휴일
    holiday_th = shop_info.find('th', text='휴일')
    holiday = holiday_th.find_next_sibling('td').get_text(strip=True, separator='||') if holiday_th else ""

    # 웹사이트 링크
    website_th = shop_info.find('th', text='웹 사이트')
    website = website_th.find_next_sibling('td').find('a')['href'] if website_th else ""


    # 이미지 링크
    image_link_element = soup.select_one('body > main > article > aside.restaurant-photos > div > figure:nth-child(1) > meta')
    image_link = image_link_element['content'] if image_link_element else ""
    
    logging.info(f'{title} info Extract Success')
    return [title,address,call_number,food_kind, parking, run_time, break_time, holiday, website, image_link]


def main():
    df = pd.read_csv('C:/last_project/MangoPlate/지하철 역별 맛집 정보.csv').reset_index(drop = True)
    for idx, url in enumerate(df['link']):
        data = restaurant_extract(url)
        df.loc[idx, 'title'] = data[0]
        df.loc[idx, 'address'] = data[1]
        df.loc[idx, 'call_number'] = data[2]
        df.loc[idx, 'food_kind'] = data[3]
        df.loc[idx, 'parking'] = data[4]
        df.loc[idx, 'run_time'] = data[5]
        df.loc[idx, 'break_time'] = data[6]
        df.loc[idx, 'holiday'] = data[7]
        df.loc[idx, 'website'] = data[8]
        df.loc[idx, 'image_link'] = data[9]
    df.to_csv('지하철 역별 맛집 정보_final.csv', encoding = 'utf-8-sig', index = False)

if __name__ == '__main__':
    main()