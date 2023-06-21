from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.amazon.aws.transfers.sql_to_s3 import SqlToS3Operator
from airflow.providers.amazon.aws.transfers.s3_to_redshift import S3ToRedshiftOperator
from airflow.models import Variable
from plugins import slack
from datetime import datetime
from datetime import timedelta

import requests
import logging
import psycopg2
import json


dag = DAG(
    dag_id = 'MySQL_to_Redshift_Upsert',
    start_date = datetime(2023,5,30), 
    schedule_interval='20 16 * * *',  # 한국 시간 기준 01시 20분에 작업 실행
    max_active_runs = 2,
    catchup = False,
    default_args = {
        'retries': 1,
        'retry_delay': timedelta(minutes=1),
        'on_failure_callback': slack.on_failure_callback
    }
)

schema = "raw"
tables = ["population","weather", "weather_fcst"]
s3_bucket = "standupseoul"

# task간 의존성 설정을 위한 리스트
mysql_to_s3_tasks = []
s3_to_redshift_tasks = []

for table in tables:
    s3_key = schema + "/mysql/" + '{{ execution_date.strftime("%Y-%m-%d") }}' + "/" + table + ".csv"
    
    mysql_to_s3 = SqlToS3Operator(
        task_id = f'mysql_to_s3_{table}',
        query = f"SELECT * FROM {table}",
        s3_bucket = s3_bucket,
        s3_key = s3_key,
        sql_conn_id = "MySQL_RDS",
        verify = False,
        replace = True,
        pd_kwargs={"index": False, "header": False, "encoding" : 'utf-8'},    
        dag = dag
    )
    
    mysql_to_s3_tasks.append(mysql_to_s3)

    s3_to_redshift = S3ToRedshiftOperator(
        task_id = f's3_to_redshift_{table}',
        s3_bucket = s3_bucket,
        s3_key = s3_key,
        schema = '"' + schema + '"',
        table = '"' + table + '"',
        copy_options=['csv'],
        method = 'UPSERT',
        upsert_keys = ["id", "created_date"],
        redshift_conn_id = "redshift_dev_db",
        dag = dag
    )
    s3_to_redshift_tasks.append(s3_to_redshift)


# task간 의존성 설정(의존성 체인 설정으로 각 task간 순차적으로 실행되게끔)
for i in range(len(mysql_to_s3_tasks)):
    mysql_to_s3_tasks[i] >> s3_to_redshift_tasks[i]
    if i < len(mysql_to_s3_tasks) - 1:
        s3_to_redshift_tasks[i] >> mysql_to_s3_tasks[i + 1]

