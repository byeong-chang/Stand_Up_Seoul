import json

# JSON 파일에서 데이터 로드
with open('./data/hotplaces_detail.json', 'r') as file:
    info_list = json.load(file)
    
with open('./data/hotplaces_detail2.json', 'r') as file:
    info_list2 = json.load(file)

# 데이터셋 병합
info_list.extend(info_list2)
df = pd.DataFrame(info_list)

# id 겹치는 것 삭제
df = df.drop_duplicates(subset = 'id').reset_index(drop = True)

# 저장
df.to_csv('./data/hotplaces_detail.csv', encoding = 'utf-8-sig', index = False)