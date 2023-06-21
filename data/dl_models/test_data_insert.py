from plugins import db_connector
import pandas as pd
import random

conn, cursor = db_connector.mysql()

cursor.execute('select id from users;')
user_df = pd.DataFrame(cursor.fetchall())
user_id_list = list(user_df[0])

cursor.execute('select id from hotplaces;')
df = pd.DataFrame(cursor.fetchall())
hotplaces_id_list = list(df[0])

text = pd.read_table('./data/ratings_test.txt')
review_data = list(text['document'])


cursor.execute('BEGIN;')
try:
    for user_id in random.sample(user_id_list, 30):
        for hotplaces_id in random.sample(hotplaces_id_list, 200):
            sql = 'INSERT INTO hotplaces_review (user_id, hotplaces_id, review) VALUES (%s, %s, %s);'
            review = random.choice(review_data)
            cursor.execute(sql, (user_id, hotplaces_id, review))
    cursor.execute('COMMIT;')
except Exception as e:
    print(e)
    cursor.execute('ROLLBACK;')
    raise
