from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import chromedriver_autoinstaller
import re
import pandas as pd
import os
import logging

filePath, fileName = os.path.split(__file__)

''' log '''
log_folder = "./logs"
os.makedirs(log_folder, exist_ok=True)
log_file = os.path.join(log_folder, "logfile.log")
logging.basicConfig(filename=log_file, level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# ChromeDriver Download
chromedriver_autoinstaller.install()

def search_link(keyword):
    
    # Chrome 옵션 생성
    chrome_options = Options()
    # 백그라운드 실행 옵션 추가
    chrome_options.add_argument("--headless")
    # 빈 데이터프레임 생성
    df = pd.DataFrame(columns=['subway', 'link'])
    # 링크 담을 리스트
    link_list = []
    
    for i in range(1,6):
        try:
            # 드라이버 실행
            driver = webdriver.Chrome(options=chrome_options)
            url = f'https://www.mangoplate.com/search/{keyword}?keword={keyword}&page={i}'
            driver.get(url)

            # 창 최대화
            driver.maximize_window()
            
            # 해당 페이지 맛집 리스트 엘리먼트 추출
            href_element = driver.find_element(By.XPATH, '/html/body/main/article/div[2]/div/div/section')
            text = href_element.get_attribute('innerHTML')
            
            # 정규표현식으로 링크 추출
            pattern = r'<a\s+href="([^"]*)"'
            href_tags = re.findall(pattern, text)
            for href in href_tags:
                if href.startswith("/restaurants/"):
                    link = 'https://www.mangoplate.com' + href
                    link_list.append(link)
                    
            driver.quit()
            
        except Exception as e:
            logging.info(f'{keyword} {i}Page error')
            logging.info(e)
            pass
        
    df['link'] = link_list
    df['subway'] = keyword
    logging.info(f'######## {keyword} {len(df)} Extract Complete')
    return df


def main():
    # 빈 데이터프레임 생성
    food_df = pd.DataFrame(columns=['subway', 'link'])

    # 역명 불러오기
    
    with open(os.path.join(filePath, 'data','subway.txt'), 'r', encoding='utf-8') as file:
        for idx, line in enumerate(file):
            if idx != 0:
                keyword = line.strip()
                food_df = pd.concat([food_df, search_link(keyword)])
                
    food_df.to_csv(os.path.join(filePath, 'data','지하철역맛집정보링크.csv'), index = False, encoding = 'utf-8-sig')
    logging.info(f'######## Csv Save Complete')
    

if __name__ == '__main__':
    main()