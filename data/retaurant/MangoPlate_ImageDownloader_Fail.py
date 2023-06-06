import requests
import pandas as pd 
import os
import logging

filePath, fileName = os.path.split(__file__)

''' log '''
log_folder = "./logs"
os.makedirs(log_folder, exist_ok=True)
log_file = os.path.join(log_folder, f"{fileName.replace('.py','')}.log")
logging.basicConfig(filename=log_file, level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

'''로그 정보 활용해서 Fail 된 File_name 추출'''
fail_list = []
log_file_path = os.path.join(log_folder, 'MangoPlate_ImageDownloader_Fail2.log')
with open(log_file_path, 'r') as log_file:
    for line in log_file:
        if 'FAIL' in line:
            fail_list.append(line.split()[5])

''' Fail_list와 데이터프레임 비교 '''
df = pd.read_csv(os.path.join(filePath, 'data', '지하철역별맛집정보최종.csv'))
df = df[df['file_name'].isin(fail_list)].reset_index()

''' 다운로드 '''
logging.info('#### Start to Download')
# use image_link and file name
for idx, url in enumerate(df['image_link']):
    try:
        if not pd.isna(url):
            image_name = df.loc[idx, 'file_name']
            
            response = requests.get(url)
            response.raise_for_status()

            with open(os.path.join(filePath, 'images', image_name), "wb") as file:
                file.write(response.content)
                logging.info(f'{image_name} DOWNLOAD SUCCESS')
        else :
            id = df.loc[idx, 'id']
            logging.info(f'{id} THERE IS NO URL')
    except Exception as E:
        logging.info(f'{image_name} DOWNLOAD FAIL')
        logging.info(E)
        pass
            
    