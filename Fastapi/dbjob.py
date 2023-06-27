import mljob
import re
from datetime import datetime
from plugins import connection

# 소수 또는 정수 값을 찾아서 반환하는 함수
def extract_number(value):
    match = re.search(r'\d+(?:\.\d+)?', value)
    if match:
        number_str = match.group()
        if '.' in number_str:
            return float(number_str)
        else:
            return int(number_str)
    return None


# area_nm 받으면 place_id 반환
def return_place_id(cur, area_nm):
    
    # 장소 ID 받아서, SQL 문

    sql = f'''
        SELECT id FROM place
        where area_nm = '{area_nm}';
        '''
    cur.execute(sql)
    result = cur.fetchall()
    
    # json
    columns = [desc[0] for desc in cur.description]  # 컬럼명 추출
    result = list(map(lambda record: dict(zip(columns, record)), result))[0]['id']
    return result

# place_id 기준 혼잡도 추출
def congest_msg(cur, place_id):
    sql = f'''
    SELECT area_congest_lvl, area_congest_msg
    FROM population_congest_msg
    WHERE id = {place_id}
    '''
    cur.execute(sql)
    predict_value, predict_msg = cur.fetchall()[0]
    return predict_value, predict_msg
    
    
# place_id 기준 주변 지하철역 반환
def place_subway_result(cur, place_id):
    
    # 장소 ID 받아서, SQL 문

    sql = f'''
        SELECT subway_nb, line, 
            (SELECT subway_nm
            FROM subway
            WHERE id = sd.subway_id) AS subway_nm, 
            sub_stn_x, sub_stn_y
        FROM subway_detail sd
        WHERE subway_id IN (
                SELECT subway_id
                FROM place_subway
                WHERE place_id = {place_id});
    '''
    cur.execute(sql)
    result = cur.fetchall()
    
    # json
    columns = [desc[0] for desc in cur.description]  # 컬럼명 추출
    result = list(map(lambda record: dict(zip(columns, record)), result))
    return result

# place_id 기준 레스토랑 4개 랜덤
def restaurant(cur, place_id, ranking_num, category_list = None):
    
    # 카테고리 리스트가 없을 경우
    if category_list is None or not category_list:
        sql = f'''
            SELECT id, title, file_name, star_rating,
                    (SELECT subway_nm
                    FROM subway
                    WHERE id = subquery.subway_id) AS subway_nm,
                    (SELECT category
                    FROM restaurant_category
                    WHERE id = subquery.category_id) AS category
            FROM (SELECT *
                    FROM restaurant
                    WHERE subway_id IN (SELECT subway_id
                                        FROM place_subway
                                        WHERE place_id = {place_id})
                    ORDER BY click_count, star_rating DESC
                    LIMIT 50) AS subquery
            ORDER BY RAND()
            LIMIT 4;
            '''
        cur.execute(sql)
        result = cur.fetchall()
        
        # json
        columns = [desc[0] for desc in cur.description]  # 컬럼명 추출
        result = list(map(lambda record: dict(zip(columns, record)), result))
        return result
    
    # 카테고리 리스트가 있을 경우
    else: 
        category_list = str(category_list)[1:-1]
        # click_count, star_rating 기준으로 category 그룹별로 상위 4개 추출, 이후 랜덤으로 정렬
        sql = f'''
                WITH subquery AS (
                            SELECT *
                            FROM restaurant
                            WHERE subway_id IN (
                                    SELECT subway_id
                                    FROM place_subway
                                    WHERE place_id = {place_id}
                                )
                                AND category_id IN (
                                    SELECT id
                                    FROM restaurant_category
                                    WHERE category IN ({category_list})
                                )),
                        ranked_rows AS (
                            SELECT *, RANK() OVER (PARTITION BY category_id ORDER BY click_count DESC, star_rating DESC) AS ranking
                            FROM subquery
                        )
                        SELECT id, title, file_name, star_rating,
                            (SELECT category from restaurant_category
                            WHERE id = rr.category_id) as category 
                        FROM ranked_rows as rr
                        WHERE ranking <= {ranking_num}
                        ORDER BY RAND();
            '''
        cur.execute(sql)
        result = cur.fetchall()
        
        # json
        columns = [desc[0] for desc in cur.description]  # 컬럼명 추출
        result = list(map(lambda record: dict(zip(columns, record)), result))
        return result

# place_id 기준 명소 4개 랜덤
def hotplaces(cur, place_id, ranking_num, category_list = None):
    
    if category_list is None or not category_list:
        # click_count, star_rating 기준으로 30개 추출 이후 4개 랜덤값 뽑기
        sql = f'''
            SELECT id, title, file_name, star_rating,
                (SELECT subway_nm
                FROM subway
                WHERE id = subquery.subway_id) AS subway_nm,
                (SELECT content_type_nm
                FROM content_type
                WHERE id = subquery.content_type_id) AS category
            FROM (SELECT *
                FROM hotplaces
                WHERE subway_id IN (SELECT subway_id
                                    FROM place_subway
                                    WHERE place_id = {place_id})
                ORDER BY click_count, star_rating DESC
                LIMIT 30) AS subquery
            ORDER BY RAND()
            LIMIT 4;
            '''
        cur.execute(sql)
        result = cur.fetchall()
        
        # json
        columns = [desc[0] for desc in cur.description]  # 컬럼명 추출
        result = list(map(lambda record: dict(zip(columns, record)), result))
        return result

    else :
        category_list = str(category_list)[1:-1]
        sql = f'''
            WITH subquery AS (
                SELECT *
                FROM hotplaces
                WHERE subway_id IN (
                        SELECT subway_id
                        FROM place_subway
                        WHERE place_id = {place_id}
                    )
                    AND content_type_id IN (
                        SELECT id
                        FROM content_type
                        WHERE content_type_nm IN ({category_list})
                    )),
            ranked_rows AS (
                SELECT *, RANK() OVER (PARTITION BY content_type_id ORDER BY click_count DESC, star_rating DESC) AS ranking
                FROM subquery
            )
            SELECT id, title, file_name, star_rating,
                (SELECT content_type_nm from content_type
                WHERE id = rr.content_type_id) as category 
            FROM ranked_rows as rr
            WHERE ranking <= {ranking_num}
            ORDER BY RAND();
            '''
        cur.execute(sql)
        result = cur.fetchall()
        
        # json
        columns = [desc[0] for desc in cur.description]  # 컬럼명 추출
        result = list(map(lambda record: dict(zip(columns, record)), result))
        return result
        

# 같은 카테고리의 장소 리스트 형태 반환
def same_category_place(cur, place_id):
    sql = f'''
        SELECT id FROM place
        where category_id = (SELECT category_id
                            FROM place
                            where id = {place_id});
        '''
    cur.execute(sql)
    result = cur.fetchall()
    result = list(map(lambda x: x[0], result))
    return result



# 아이디 값을 넣엉주면 place 관련 정보 반환해주는 함수
def place_info(cur, place_ids):
    sql = f'''
        SELECT id, area_nm, place_image FROM place
        WHERE id in {place_ids};
        '''
    cur.execute(sql)
    result = cur.fetchall()
    # json
    columns = [desc[0] for desc in cur.description]  # 컬럼명 추출
    result = list(map(lambda record: dict(zip(columns, record)), result))

    return result

# top4 값 result 값 매핑해주는 함수
def mapping_result(cur, top4, result):
    # predict place 정보값 매핑
    for i in top4:
        id = list(i.keys())[0]
        for idx, j in enumerate(result):
            if j['id'] == id:
                predict_value = list(i.values())[0]
                sql = f'''
                    SELECT area_congest_lvl, area_congest_msg
                    FROM population_congest_msg
                    WHERE id = {predict_value}
                    '''
                cur.execute(sql)
                predict_value, predict_msg = cur.fetchall()[0]
                result[idx]['predict_value'] = predict_value
                result[idx]['predict_msg'] = predict_msg
    return result


# 지하철 인원을 반환합니다.
def return_subway_q(cur, subway_nb):
    sql = f'''
        SELECT q1,q2,q3
        FROM subway_detail
        WHERE subway_nb = {subway_nb};
        '''
        
    cur.execute(sql)
    result = cur.fetchall()
    # json
    columns = [desc[0] for desc in cur.description]  # 컬럼명 추출
    result = list(map(lambda record: dict(zip(columns, record)), result))

    return result[0]
    
# weather_fcst_3days 테이블을 활용(기상청 api), 온도, 날씨, 1시간 강수량, 온도를 뱉어주는 함수
def return_weather(year, month, day, hour):
    '''
    데이터베이스에 오늘 포함 3일치만 저장되어있습니다.
    오늘이 6월 22일이라면, 6월 23일, 6월 24일 데이터만 저장되어있습니다
    이 외의 다른 날들은 return 할 수 없습니다.
    '''
    date_str = datetime(year, month, day).strftime("%Y%m%d")

    # PCP : 1시간 강수량, REH : 습도(%), WSD : 풍속(m/s), TMP : 온도
    conn, cur = connection.mysql()
    sql = f'''
        SELECT category, fcstValue FROM weather_fcst_3days
        WHERE fcstDate = {date_str} AND fcstTime = {hour} AND category IN ('PCP', 'REH', 'WSD', 'TMP');
        '''
    cur.execute(sql)
    result = cur.fetchall()

    # 데이터 추출
    columns = [desc[0] for desc in cur.description] 
    result_dict = {record[0]: record[1] for record in result}
    tmp = extract_number(result_dict['TMP'])
    wsd = extract_number(result_dict['WSD'])
    pcp = extract_number(result_dict['PCP'])
    reh = extract_number(result_dict['REH'])
    
    return tmp, wsd, pcp, reh