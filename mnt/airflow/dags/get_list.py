from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
#from airflow.providers.apache.hive.operators.hive import HiveOperator
#from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
#from airflow.operators.email import EmailOperator
from airflow.providers.slack.operators.slack_webhook import SlackWebhookOperator
from airflow.contrib.operators.spark_submit_operator import SparkSubmitOperator
from airflow.hooks.base_hook import BaseHook
#from airflow.providers.postgres.operators.postgres import PostgresOperator

import json, time
#import numpy as np
import pandas as pd, pytz
from datetime import datetime, timedelta
import requests
import psycopg2
from sqlalchemy import create_engine

import psycopg2
import numpy as np
import psycopg2.extras as extras
import pandas as pd


def convert_datetime(datetime_string):

    return datetime_string.astimezone(pytz.timezone('America/Montevideo')).strftime('%b-%d %H:%M:%S')


##### Slack Alerts #####
def _slack_fail_alert(context):
   
    slack_webhook_token = "T04JSBUJY20/B04J9CKV2NB/3tflPNNUsHSzSIwsH0kuu8oq"
    slack_msg = f"""
        :x: Task Failed.
        *Task*: {context.get('task_instance').task_id}
        *Dag*: {context.get('task_instance').dag_id}
        *Execution Time*: {convert_datetime(context.get('execution_date'))}
        <{context.get('task_instance').log_url}|*Logs*>
    """

    slack_alert = SlackWebhookOperator(
        task_id='slack_fail',
        webhook_token=slack_webhook_token,
        message=slack_msg,
        channel='#monitoring',
        username='airflow',
        http_conn_id='slack_conn'
    )

    return slack_alert.execute(context=context)

def _slack_success_alert(context):
   
    slack_webhook_token = "T04JSBUJY20/B04J9CKV2NB/3tflPNNUsHSzSIwsH0kuu8oq"
    slack_msg = f"""
        :white_check_mark: Task Success.
        *Task*: {context.get('task_instance').task_id}
        *Dag*: {context.get('task_instance').dag_id}
        *Execution Time*: {convert_datetime(context.get('execution_date'))}
        <{context.get('task_instance').log_url}|*Logs*>
    """

    slack_alert = SlackWebhookOperator(
        task_id='slack_sucess',
        webhook_token=slack_webhook_token,
        message=slack_msg,
        channel='#monitoring',
        username='airflow',
        http_conn_id='slack_conn'
    )

    return slack_alert.execute(context=context)


pipeline_name = "Obtener_Listado_Crypto"

default_args = {
    "owner": "airflow",
    "email_on_failure": False,
    "email_on_retry": False,
    "email": "mek19941@gmail.com",
    "on_failure_callback": _slack_fail_alert,
    "on_success_callback":_slack_success_alert,
    "retries": 0,
    "retry_delay": timedelta(minutes=5)
}


with DAG(pipeline_name, 
        start_date=datetime(2022, 1, 1), 
        schedule_interval="@daily",
        default_args=default_args,
        catchup=False) as dag:

    def _get_crypto_list():
        url = "https://api.livecoinwatch.com/coins/list"

        payload = json.dumps({
        "currency": "USD",
        "sort": "rank",
        "order": "ascending",
        "offset": 0,
        "limit": 100,
        "meta": False
        })
        headers = {
        'content-type': 'application/json',
        'x-api-key': 'e33e7645-5e90-4a06-84ef-52a6e2642951'
        }

        response = requests.request("POST", url, headers=headers, data=payload)

        df = response.json()
        df = pd.DataFrame(df)
        df = df['code'].values
        df = pd.Series(df)
        df.to_csv(r'/opt/airflow/dags/files/crypto_list.csv', index=False)
        _insert_data(df)

    get_data = PythonOperator(
        task_id = "Obtener_Listado_Crypto",
        python_callable=_get_crypto_list,
        dag=dag
    )

    #saving_list = BashOperator(
    #    task_id = "Guardar_Listado",
    #    bash_command= """
    #        hdfs dfs -mkdir -p /crypto && \
    #        hdfs dfs -put -f $AIRFLOW_HOME/dags/files/crypto_list.csv /crypto
    #    """,
    #    dag=dag
    #)

    #create_crypto_list_table = HiveOperator(
    #    task_id = "Crear_Tabla_Listado",
    #    hive_cli_conn_id = "hive_conn",
    #    hql="""
    #        CREATE EXTERNAL TABLE IF NOT EXISTS `crypto_list`(
    #            `symbol` STRING
    #            )
    #        ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.OpenCSVSerde'
    #        STORED AS TEXTFILE
    #        TBLPROPERTIES ("skip.header.line.count"="1");
    #    """,
    #    dag=dag
    #)

    def _insert_data(df):
        #conn_string = "host='postgres:5432' dbname='airflow' user='airflow' password='airflow'"
        #engine = create_engine('postgresql+psycopg2://airflow:airflow@postgres:5432/airflow')
        #conn = engine.raw_connection()
        #df = pd.read_csv('/opt/airflow/dags/files/crypto_list.csv')

        #perform COPY test and print result
        #sql = '''
        #COPY copy_test
        #FROM '/opt/airflow/dags/files/crypto_list.csv'
        #DELIMITER ',' CSV;
        #'''

        #table_create_sql = '''
        #CREATE TABLE IF NOT EXISTS cripto_list (coin varchar)
        #'''

        #pg_conn = psycopg2.connect(conn)
        #cur = pg_conn.cursor()
        #cur.execute(table_create_sql)
        #cur.execute('TRUNCATE TABLE cripto_list') #Truncate the table in case you've already run the script before

        #start_time = time.time()
        #df.to_csv('crypto_list.csv', index=False, header=False) #Name the .csv file reference in line 29 here
        #cur.execute(sql)
        #pg_conn.commit()
        #cur.close()
        #print("COPY duration: {} seconds".format(time.time() - start_time))
        conn = psycopg2.connect(
            database="airflow", user='airflow', password='airflow', host='postgres', port='5432'
        )
        table = 'cripto_list'

        tuples = [tuple(x) for x in df.to_numpy()]
    
        cols = ','.join(list(df.columns))
        # SQL query to execute
        query = "INSERT INTO %s(%s) VALUES %%s" % (table, cols)
        cursor = conn.cursor()
        try:
            extras.execute_values(cursor, query, tuples)
            conn.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            print("Error: %s" % error)
            conn.rollback()
            cursor.close()
            return 1
        print("the dataframe is inserted")
        cursor.close()

        return 1

    #create_crypto_list_table = _create_table 

    #crypto_processing = SparkSubmitOperator(
    #    task_id = "Procesar_Data",
    #    application="/opt/airflow/dags/scripts/crypto_processing.py",
    #    conn_id = "spark_conn",
    #    verbose=True,
    #    dag=dag
    #)

    #task_load_iris_data = BashOperator(
	#task_id='load_iris_data',
	#bash_command=(
	#	'psql -d db_test -U dradecic -c "'
	#	'COPY crypto_list(symbol)'
	#	"FROM '$AIRFLOW_HOME/dags/files/crypto_list.csv' "
	#	"DELIMITER ',' "
	#	'CSV HEADER"'
	#)
    #)

    #send_email_notification = EmailOperator(
    #    task_id = "send_email_notification",
    #    to="mek19941@gmail.com",
    #    subject="crypto_list",
    #    html_content="<h3>crypto_list</h3>"
    #)

    #send_slack_notification = SlackWebhookOperator(
    #    task_id = "Enviar_Slack_Alert",
    #    http_conn_id = "slack_conn",
    #    message=_get_message(pipeline_name),
    #    channel="#monitoring",
    #    dag=dag
    #)


get_data #>> crypto_processing

#get_data >> saving_list >> create_crypto_list_table >> crypto_processing
##send_slack_notification
##send_email_notification