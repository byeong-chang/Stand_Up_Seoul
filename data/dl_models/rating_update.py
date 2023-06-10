import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import load_model
from tqdm import tqdm
import pandas as pd
from konlpy.tag import Okt
import pickle
import re
from plugins import db_connector
import logging
import os


filePath, fileName = os.path.split(__file__)

''' log '''
log_folder = "./logs"
os.makedirs(log_folder, exist_ok=True)
log_file = os.path.join(log_folder, f"{fileName.replace('.py','')}.log")
logging.basicConfig(filename=log_file, level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def main():
    conn, cursor = db_connector.mysql()
    try:
        # START
        logging.info('############## Start To Update Review Star Rating')
        
        # okt 정의
        okt = Okt()

        # tqdm(pandas)
        tqdm.pandas()

        # 불용어처리
        stopwords = ['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다']

        # 토큰 불러오기
        with open('./models/tokenizer.pickle', 'rb') as handle:
            tokenizer = pickle.load(handle)

        # 모델 불러오기
        loaded_model = load_model('./models/best_model.h5')

        # extact
        df = extract_restaurant_review(cursor)
        
        # transform
        grouping = calculate_star_rating(df , okt, stopwords, tokenizer, loaded_model)
        
        # load
        load_mysql(grouping, cursor)
        
        # log
        logging.info('############## Success To Update Restaruant Star Rating')
    
    except Exception as e:
        logging.info(e)
        raise
    


def extract_restaurant_review(cursor):
    # db connect
    review_cnt = cursor.execute('select restaurant_id, review from restaurant_review;')
    if review_cnt == 0:
        logging.info('There is No Review')
        raise
    
    # extract data
    df = pd.DataFrame(cursor.fetchall())
    df = df.rename(columns={0: 'restaurant_id', 1: 'review'})
    return df



'''Calculate Star Rating'''

def calculate_star_rating(df, okt, stopwords, tokenizer, loaded_model):
    # processing
    df['padding'] = df['review'].progress_apply(lambda x : processing(x, okt, stopwords, tokenizer))

    # function_define
    def data_generator():
        for item in df['padding'].values:
            yield item.flatten()
            
    # predict
    dataset = tf.data.Dataset.from_generator(data_generator, output_signature=tf.TensorSpec(shape=(None,), dtype=tf.int32))
    batched_data = dataset.batch(64)
    predictions = loaded_model.predict(batched_data)
    df['prediction'] = predictions

    # star_rating calculate
    # 기준 : restaurant_id , prediction 평균값 구한 후, 평균 값 구해서 * 5
    grouping = df.groupby('restaurant_id')['prediction'].mean() * 5
    grouping = grouping.reset_index()
    return grouping

def processing(new_sentence, okt, stopwords, tokenizer):
    # 패딩 길이 정의
    max_len = 30
    new_sentence = re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣 ]','', new_sentence)
    new_sentence = okt.morphs(new_sentence, stem=True) # 토큰화
    new_sentence = [word for word in new_sentence if not word in stopwords] # 불용어 제거
    encoded = tokenizer.texts_to_sequences([new_sentence]) # 정수 인코딩
    pad_new = pad_sequences(encoded, maxlen = max_len) # 패딩
    return pad_new

'''Calculate Star Rating end'''

def load_mysql(grouping, cursor):
    # Update
    cursor.execute('BEGIN;')

    try:
        for idx in grouping.index:
            restaurant_id = grouping.loc[idx, 'restaurant_id']
            star_rating = grouping.loc[idx, 'prediction']
            sql = f"UPDATE restaurant SET star_rating = {star_rating} WHERE id = {restaurant_id};"
            logging.info(sql)
            cursor.execute(sql)

        cursor.execute('COMMIT;')
    except Exception as e:
        cursor.execute('ROLLBACK;')
        logging.info(e)
        raise    
    

if __name__ == '__main__':
    main()



