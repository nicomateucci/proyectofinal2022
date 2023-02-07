import pyspark
from pyspark.sql import SparkSession
from pyspark.sql import Row

warehouse_location = abspath('spark-warehouse')

# Initialize Spark Session
spark = SparkSession \
    .builder \
    .appName("Crypto list processing") \
    .config("spark.sql.warehouse.dir", warehouse_location) \
    .enableHiveSupport() \
    .getOrCreate()

df1=spark.sql("select * from `crypto_coins`")
df1.show()