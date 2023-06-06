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

def main():
    df = pd.read_csv(os.path.join(filePath, 'data', 'hotplaces.csv'))
    # use image_link and file name
    for idx in df.index:
        try:
            url = df.loc[idx,'firstimage']
            if not pd.isna(url):
                image_name = df.loc[idx, 'file_name']
                
                response = requests.get(url)
                response.raise_for_status()

                with open(os.path.join(filePath, 'images', image_name), "wb") as file:
                    file.write(response.content)
                    logging.info(f'{image_name} DOWNLOAD SUCCESS')
            else :
                df.loc[idx, 'file_name'] = None
                logging.info(f'{id} THERE IS NO URL')
        except:
            logging.info(f'{image_name} DOWNLOAD FAIL')
            pass
    df.to_csv(os.path.join(filePath, 'data', 'hotplaces.csv'), encoding = 'utf-8-sig', index = False)
    
if __name__ == '__main__':
    main()        