import pymysql 

conn = pymysql.connect(host='host', database = 'db', user='id', password='password', charset='utf8') 
cursor = conn.cursor() 

sql = "select id, area_nm from place;" 
cursor.execute(sql) 
result = cursor.fetchall()


for i in result:
    id = i[0]
    area_nm = i[1]
    en_area_nm = urllib.parse.quote(area_nm)
    print(id, area_nm, en_area_nm)
    download = f'https://standupseoul.s3.ap-northeast-2.amazonaws.com/place/{en_area_nm}.jpg'
    sql = f"UPDATE place SET place_image = '{download}' WHERE id = {id};"
    cursor.execute(sql)
    
# 변경사항을 커밋
conn.commit()