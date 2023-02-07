from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
#from airflow.providers.apache.hive.operators.hive import HiveOperator
#from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
#from airflow.operators.email import EmailOperator
from airflow.providers.slack.operators.slack_webhook import SlackWebhookOperator
from airflow.contrib.operators.spark_submit_operator import SparkSubmitOperator
#from airflow.hooks.base_hook import BaseHook
#from airflow.hooks.hive_hooks import HiveServer2Hook
#from airflow.providers.postgres.operators.postgres import PostgresOperator

import json, time
import pandas as pd, pytz
from datetime import datetime, timedelta
import requests
import psycopg2


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

pipeline_name = "Carga_Inicial"

default_args = {
    "owner": "airflow",
    "email_on_failure": False,
    "email_on_retry": False,
    "email": "mek19941@gmail.com",
    "on_failure_callback": _slack_fail_alert,
    "on_success_callback": _slack_success_alert,
    "retries": 0,
    "retry_delay": timedelta(minutes=5)
}

coins = ['BTC', 'ETH']


with DAG(pipeline_name, 
        start_date=datetime(2022, 1, 1), 
        schedule_interval="@daily",
        default_args=default_args,
        catchup=False) as dag:

    #def _get_coins():
    #    hh = HiveOperator(
    #        task_id = "Crear_Tabla_Listado",
    #        hive_cli_conn_id = "hive_conn",
    #        hql="""
    #            SELECT `symbol` FROM `crypto_list`;
    #        """)
    #    sql = "SELECT `symbol` FROM `crypto_list`"
    #    rows = hh.get_records(sql)
    #    print(rows)
    #    return rows

    def _get_coins():

        #conn_string = "host='postgres:5432' dbname='airflow' user='airflow' password='airflow'"
        conn_string = 'postgresql+psycopg2://airflow:airflow@postgres:5432/airflow'
        # get a connection, if a connect cannot be made an exception will be raised here
        conn = psycopg2.connect(conn_string)

        # conn.cursor will return a cursor object, you can use this cursor to perform queries
        cursor = conn.cursor()

        # execute our Query
        cursor.execute("SELECT coin FROM cripto_list")

        # retrieve the records from the database
        records = cursor.fetchall()

        return records
        
    def _get_crypto_list():
        url = "https://api.livecoinwatch.com/coins/single/history"

        df_completo = pd.DataFrame()

        coins = _get_coins()

        for coin in coins:
            payload = json.dumps({
            "currency": "USD",
            "code": coin,
            "start": 1577847600000,
            "end": 1672455600000,
            "meta": True
            })
            headers = {
            'content-type': 'application/json',
            'x-api-key': 'e33e7645-5e90-4a06-84ef-52a6e2642951'
            }

            response = requests.request("POST", url, headers=headers, data=payload)
            df = response.json()
            df_f =pd.json_normalize(df,record_path=['history'], meta=[
                            'code', 'name', 'symbol', 'rank', 'age', 'maxSupply', 'allTimeHighUSD', ['links', 'website'], ['links', 'whitepaper']])
            df_completo = df_completo.append(df_f)
        
        df_completo.to_csv('/opt/airflow/dags/files/initial_execution.csv', index=False)
        _insert_data()

    def _insert_data():
        #conn_string = 'postgres://airflow:airflow@localhost/airflow'
        #conn_string = "host='postgres' dbname='airflow' user='airflow' password='airflow'"
        conn_string = 'postgresql+psycopg2://airflow:airflow@postgres:5432/airflow'

        df = pd.read_csv('/opt/airflow/dags/files/initial_execution.csv')

        #perform COPY test and print result
        sql = '''
        COPY copy_test
        FROM '/opt/airflow/dags/files/initial_execution.csv'
        DELIMITER ',' CSV;
        '''

        table_create_sql = '''
        CREATE TABLE IF NOT EXISTS criptomonedas (  coin                varchar
                                                    rate                float,
                                                    volume              bigint,
                                                    cap                 bigint,
                                                    liquidity           bigint,
                                                    code                varchar,
                                                    name                varchar,
                                                    symbol              varchar,
                                                    rank                bigint,
                                                    age                 bigint,
                                                    maxSupply           bigint,
                                                    allTimeHighUSD      float,
                                                    links.website       varchar,
                                                    links.whitepaper    varchar)
        '''

        pg_conn = psycopg2.connect(conn_string)
        cur = pg_conn.cursor()
        cur.execute(table_create_sql)
        #cur.execute('TRUNCATE TABLE cripto_list') #Truncate the table in case you've already run the script before

        start_time = time.time()
        df.to_csv('initial_execution.csv', index=False, header=False) #Name the .csv file reference in line 29 here
        cur.execute(sql)
        pg_conn.commit()
        cur.close()
        print("COPY duration: {} seconds".format(time.time() - start_time))



        #close connection
        #conn.close()
        return 1

    get_data = PythonOperator(
        task_id = "Obtener_Data_Inicial",
        python_callable=_get_crypto_list,
        dag=dag
    )

    #saving_list = BashOperator(
    #    task_id = "Guardar_Data_Inicial",
    #    bash_command= """
    #        hdfs dfs -mkdir -p /crypto && \
    #        hdfs dfs -put -f $AIRFLOW_HOME/dags/files/initial_execution.csv /crypto
    #    """,
    #    dag=dag
    #)

    #insert_into_table = HiveOperator(
    #    task_id = "Crear_Tabla_Crypto_Coins",
    #    hive_cli_conn_id = "hive_conn",
    #    hql="""
    #        CREATE EXTERNAL TABLE IF NOT EXISTS `crypto_coins`(
    #            `date` STRING,
    #            `rate` STRING,
    #            `volume` STRING,
    #            `cap` STRING,
    #            `liquidity` STRING,	
    #            `code` STRING, 
    #            `name` STRING,
    #            `symbol` STRING, 
    #            `rank` STRING, 
    #            `age` STRING, 
    #            `maxSupply` STRING, 
    #            `allTimeHighUSD` STRING, 
    #            `website` STRING, 
    #            `whitepaper` STRING
    #            )
    #        ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.OpenCSVSerde'
    #        STORED AS TEXTFILE
    #        TBLPROPERTIES ("skip.header.line.count"="1");
    #    """,
    #    dag=dag
    #)

    crypto_processing = SparkSubmitOperator(
        task_id = "Procesar_Data",
        application="/opt/airflow/dags/scripts/initial_processing.py",
        conn_id = "spark_conn",
        verbose=True,
        dag=dag
    )

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

#get_data >> saving_list >> insert_into_table >> crypto_processing 
#send_slack_notification
##send_email_notification