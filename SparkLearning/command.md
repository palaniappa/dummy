https://sparkbyexamples.com/spark/submit-spark-job-via-rest-api/

./sbin/start-master.sh
./sbin/start-slave.sh spark://192.168.1.1:7077

http://192.168.1.1:8080


curl -X POST http://192.168.0.101:6066/v1/submissions/create --header "Content-Type:application/json;charset=UTF-8" --data '{
  "appResource": "/Volumes/HDD2/myownrepos/dummy/SparkLearning/createparquet/target/createparquet-1.0-SNAPSHOT.jar",
  "sparkProperties": {
    "spark.executor.memory": "2g",
    "spark.master": "spark://palaniappa-ltm.internal.salesforce.com:7077",
    "spark.driver.memory": "2g",
    "spark.driver.cores": "2",
    "spark.eventLog.enabled": "false",
    "spark.app.name": "My First App",
    "spark.submit.deployMode": "cluster",
    "spark.jars": "",
    "spark.driver.supervise": "true"
  },
  "clientSparkVersion": "2.4.0",
  "mainClass": "com.dummy.job.SparkMain",
  "environmentVariables": {
    "SPARK_ENV_LOADED": "1"
  },
  "action": "CreateSubmissionRequest",
  "appArgs": [
    "Ind7.parquet"
  ]
}'


curl http://192.168.0.101:6066/v1/submissions/status/driver-20210703200754-0004

bin/spark-submit --conf spark.driver.extraJavaOptions=-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=5005 --class com.dummy.job.SparkMain /Volumes/HDD2/myownrepos/dummy/SparkLearning/createparquet/target/createparquet-1.0-SNAPSHOT.jar Ind4.parquet

bin/spark-submit --class com.tutorial.pairrdd.WordCountWithPairRddAndReduceByKey /Volumes/HDD2/myownrepos/dummy/SparkTutorial/target/SparkTutorial-1.0-SNAPSHOT.jar Ind4.parquet

sc.hadoopConfiguration.set("fs.s3n.awsAccessKeyId", [ACCESS KEY ID])
scala> sc.hadoopConfiguration.set("fs.s3n.awsSecretAccessKey", [SECRET ACCESS KEY] )
scala> val myRDD = sc.textFile("s3n://adp-px/baby-names.csv")
scala> myRDD.count()




curl -X POST http://192.168.0.101:6066/v1/submissions/create --header "Content-Type:application/json;charset=UTF-8" --data '{
  "appResource": "/Volumes/HDD2/myownrepos/dummy/SparkTutorial/target/SparkTutorial-1.0-SNAPSHOT.jar",
  "sparkProperties": {
    "spark.executor.memory": "2g",
    "spark.master": "spark://palaniappa-ltm.internal.salesforce.com:7077",
    "spark.driver.memory": "2g",
    "spark.driver.cores": "2",
    "spark.eventLog.enabled": "false",
    "spark.app.name": "My First App",
    "spark.submit.deployMode": "cluster",
    "spark.jars": "",
    "spark.driver.supervise": "true"
  },
  "clientSparkVersion": "2.4.0",
  "mainClass": "com.tutorial.pairrdd.WordCountWithPairRddAndReduceByKey",
  "environmentVariables": {
    "SPARK_ENV_LOADED": "1"
  },
  "action": "CreateSubmissionRequest",
  "appArgs": [
    "Ind7.parquet"
  ]
}'