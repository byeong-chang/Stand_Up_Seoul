import json
import pandas as pd
import os

filePath, fileName = os.path.split(__file__)

# JSON 파일 열기
with open(os.path.join(filePath, 'data','지하철역별맛집정보최종.json'), "r", encoding= 'utf-8') as file:
    data = json.load(file)

id, menu, price = ([] for _ in range(3))

for i in data:
    if i['menu'] != "":
        for food in i['menu']:
            id.append(i['id'])
            menu.append(food)
            price.append(i['menu'][food])
    
data = {
    'id': id,
    'menu': menu,
    'price' : price
}

df = pd.DataFrame(data)

df.to_csv(os.path.join(filePath, 'data','지하철역별맛집정보메뉴.csv'), index = False, encoding = 'utf-8-sig')