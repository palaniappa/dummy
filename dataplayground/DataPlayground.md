# Competing companies
Five tran
heo data
Info works
Qubole
Dinesh Rathi - > his own company
Thought spot


# create external table
create external table if not exists Individuals (
id varchar(255),partyid varchar(255),personname varchar(255),maritalstatus varchar(255),maritalstatusname varchar(255),yearlyincome decimal(38,15),birthdate date,gender varchar(255),childrencount int,occupation varchar(255)
)
comment "My first external table from HDFS after ingoring the header"
row format delimited fields terminated by ','
stored as textfile
location '/user/pramanathan/csvs/'
tblproperties ("skip.header.line.count"="1");


# Hive setup details
metastore, hiveuser, hiveuser
beeline -u jdbc:hive2://

hive --service metastore

# S3
s3://palaniappas3/Individual/Individual.csv
AKIAXV7P3L7T6YY7S54J
4LDxlxN56c6zBVPlHwGHXBXDTV3P6OqOHXFoFQ/w

<property>
  <name>fs.s3a.access.key</name>
  <value>AKIAXV7P3L7T6YY7S54J</value>
  <description>AWS access key ID. Omit for Role-based authentication.</description>
</property>
<property>
  <name>fs.s3a.secret.key</name>
  <value>4LDxlxN56c6zBVPlHwGHXBXDTV3P6OqOHXFoFQ/w</value>
  <description>AWS secret key. Omit for Role-based authentication.</description>
</property>

create external table if not exists S3Individuals (
id varchar(255),partyid varchar(255),personname varchar(255),maritalstatus varchar(255),maritalstatusname varchar(255),yearlyincome decimal(38,15),birthdate date,gender varchar(255),childrencount int,occupation varchar(255)
)
comment "My first external table from S3 after ingoring the header"
row format delimited fields terminated by ','
stored as textfile
location 's3a://palaniappas3/Individual/'
tblproperties ("skip.header.line.count"="1");




# Presto

presto-server run

select * from mydb.public.testtable;

hive --service metastore

show schemas from hive;