import json
import pandas as pd
import os

# JSON 파일 열기
filePath, fileName = os.path.split(__file__)

with open(os.path.join(filePath, 'data','지하철역별맛집정보최종.json'), "r", encoding = 'utf-8') as file:
    data = json.load(file)

id, title, new_address, old_address, call_number, food_kind, parking, run_time, break_time, holiday, website, image_link, menu, subway, file_name = ([] for _ in range(15))

for i in data:
    id.append(i['id'])
    title.append(i['title'] or None)
    new_address.append(i['address']['new_address'] or None)
    old_address.append(i['address']['old_address'] or None)
    call_number.append(i['call_number'] or None)
    food_kind.append(i['food_kind'] or None)
    parking.append(i['parking'] or None)
    run_time.append(i['run_time'] or None)
    break_time.append(i['break_time'] or None)
    holiday.append(i['holiday'] or None)
    website.append(i['website'] or None)
    image_link.append(i['image_link'] or None)
    subway.append(i['subway'] or None)
    file_name.append(i['file_name'] or None)
    

data = {
    'id' : id,
    'title': title,
    'new_address': new_address,
    'old_address': old_address,
    'call_number': call_number,
    'food_kind': food_kind,
    'parking': parking,
    'run_time': run_time,
    'break_time': break_time,
    'holiday': holiday,
    'website': website,
    'image_link': image_link,
    'subway': subway,
    'file_name': file_name
}

df = pd.DataFrame(data)
df.to_csv(os.path.join(filePath, 'data','지하철역별맛집정보최종.csv'), index = False, encoding = 'utf-8')