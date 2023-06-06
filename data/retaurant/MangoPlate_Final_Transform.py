import pandas as pd
from datetime import datetime
import os

filePath, fileName = os.path.split(__file__)

# 데이터프레임 생성
df = pd.read_csv(os.path.join(filePath, 'data','지하철역별맛집정보최종.csv'))
category = pd.read_csv(os.path.join(filePath, 'data','음식카테고리분류.csv'))

for idx, kind in enumerate(df['food_kind']):
    for idx2, food in enumerate(category['음식']):
        if kind == food:
            df.loc[idx, 'food_kind'] = category.loc[idx2, '카테고리']
            
date = datetime.now().strftime('%Y%m%d')
df = df[df['id'] != 0]
run_time = df[['id', 'run_time']]
break_time = df[['id', 'break_time']]
df = df.drop(columns = ['run_time', 'break_time'])
df['file_name'] = df['file_name'].apply(lambda x: 'https://standupseoul.s3.ap-northeast-2.amazonaws.com/restaurant/' + x if pd.notna(x) else x)
df = df.drop(columns = 'image_link')
# run_time
run_time = run_time.dropna(subset = ['run_time'])
run_time['run_time'] = run_time['run_time'].apply(lambda x: x.split('|'))
run_time = run_time.explode('run_time')
# 컬럼명 변경
run_time = run_time.rename(columns={'id': 'restaurant_id'})
run_time = run_time[['restaurant_id', 'run_time']]

# break_time
break_time = break_time.dropna(subset = ['break_time'])
break_time['break_time'] = break_time['break_time'].apply(lambda x: x.split('|'))
break_time = break_time.explode('break_time')
break_time = break_time.rename(columns={'id': 'restaurant_id'})
break_time = break_time[['restaurant_id', 'break_time']]

# save
df.to_csv(os.path.join(filePath, 'data',f'지하철역별맛집정보최종_{date}.csv'), index = False, encoding = 'utf-8-sig')
run_time.to_csv(os.path.join(filePath, 'data',f'지하철역별맛집운영시간_{date}.csv'), index = False, encoding = 'utf-8-sig')
break_time.to_csv(os.path.join(filePath, 'data',f'지하철역별맛집휴식시간_{date}.csv'), index = False, encoding = 'utf-8-sig')