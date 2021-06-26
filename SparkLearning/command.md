https://sparkbyexamples.com/spark/submit-spark-job-via-rest-api/

./sbin/start-master.sh
./sbin/start-slave.sh spark://192.168.1.1:7077

http://192.168.1.1:8080


curl -X POST http://localhost:6066/v1/submissions/create --header "Content-Type:application/json;charset=UTF-8" --data '{
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
    "ind3.parquet"
  ]
}'

bin/spark-submit --class com.dummy.job.SparkMain /Volumes/HDD2/myownrepos/dummy/SparkLearning/createparquet/target/createparquet-1.0-SNAPSHOT.jar Ind4.parquet