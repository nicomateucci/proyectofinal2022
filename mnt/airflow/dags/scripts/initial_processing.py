from os.path import expanduser, join, abspath

from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json

warehouse_location = abspath('spark-warehouse')

# Initialize Spark Session
spark = SparkSession \
    .builder \
    .appName("Crypto list processing") \
    .config("spark.sql.warehouse.dir", warehouse_location) \
    .enableHiveSupport() \
    .getOrCreate()

# Read the file crypto_list.json from the HDFS
df = spark.read.csv('hdfs://namenode:9000/crypto/initial_execution.csv')

# Drop the duplicated rows based on the name and symbol columns
#crypto = df.select('_c0') \
#    .dropDuplicates('_c0')

# Export the dataframe into the Hive table crypto_list
df.write.mode("append").insertInto("crypto_coins")

