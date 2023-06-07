# use image_link and file name
import urllib.request
import os

filePath, fileName = os.path.split(__file__)


with open(os.path.join(filePath, 'data', '서울시 주요 48장소.txt'), 'r', encoding = 'utf-8-sig') as file:
    for place in file:
        place = place.strip()
        encoding_place = urllib.parse.quote(place)
        download = f'https://data.seoul.go.kr/SeoulRtd/images/hotspot/{encoding_place}.jpg'
        print(download)

        urllib.request.urlretrieve(download, os.path.join(filePath, 'images', f'{place}.jpg'))
        print(f'{place} DOWNLOAD SUCCESS')