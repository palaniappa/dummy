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

-- run hive server and hive
hiveserver2


# Hive S3 and External Table
s3://palaniappas3/Individual/Individual.csv

/usr/local/Cellar/hive/3.1.2_1/libexec/conf/hive-site.xml
=======
# S3
s3://palaniappas3/Individual/Individual.csv


<property>
  <name>fs.s3a.access.key</name>
  <value>****************</value>
  <description>AWS access key ID. Omit for Role-based authentication.</description>
</property>
<property>
  <name>fs.s3a.secret.key</name>
  <value>****************</value>
  <description>AWS secret key. Omit for Role-based authentication.</description>
</property>



create external table if not exists StoreIndividuals (
id varchar(255),partyid varchar(255),personname varchar(255), email varchar(255),
Address varchar(255),Phone varchar(255),SocialHandle varchar(255),maritalstatus varchar(255),maritalstatusname varchar(255),yearlyincome decimal(38,15),birthdate date,gender varchar(255)
,childrencount int,occupation varchar(255)
)
comment "My first external table from S3 after ingoring the header"
row format delimited fields terminated by ','
ESCAPED BY '\\'
stored as textfile
location 's3a://palaniappas3/IndividualId/'
tblproperties ("skip.header.line.count"="1");


create external table if not exists SalesOrders (
OrderId varchar(500),CustomerNum varchar(500),StoreNumber varchar(500),StoreState varchar(500),StoreZipCode varchar(500),OrderDate varchar(500),DeliveryMethod varchar(500),OrderStatus varchar(500),OrderTotal int,OrderLoyaltyPoints int )
comment "My SalesOrder table from  S3 after ingoring the header"
row format delimited fields terminated by ','
ESCAPED BY '\\'
stored as textfile
location 's3a://palaniappas3/SalesOrders/'
tblproperties ("skip.header.line.count"="1");


create external table if not exists Orders (
RowID varchar(500), Order_ID varchar(500), Order_Date varchar(30), Ship_Date varchar(30), Ship_Mode varchar(500), IndividualId varchar(500), Customer_ID varchar(500), Customer_Name varchar(500), Segment varchar(500), Country varchar(500), City varchar(500), State varchar(500), Postal_Code varchar(500), Region varchar(500), Product_ID varchar(500), Category varchar(500), Sub_Category varchar(500), Product_Name varchar(500), SalesTotalAmount decimal(38,15), Quantity int, Discount decimal(38,15), Profit decimal(38,15)
)
comment "My SalesOrder table from  S3 after ingoring the header"
row format delimited fields terminated by ','
ESCAPED BY '\\'
stored as textfile
location 's3a://palaniappas3/Orders/'
tblproperties ("skip.header.line.count"="1");


# postgres
psql testdb --username=testuser --password

# Start Hadoop

/usr/local/Cellar/hadoop/3.3.0/sbin/start-all.sh
=======
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





show catalogs; //lists all the catalogs

show schemas from hive; //lists all the schemas in the catalog

show tables from hive.default; //lists all the tables from the given catalog.schema


select * from mydb.public.testtable;

# presto create external table

CREATE TABLE hive.default.salesorder (
    OrderId VARCHAR,
    CustomerNum VARCHAR,
    StoreNumber VARCHAR,
    StoreState VARCHAR,
    StoreZipCode VARCHAR,
    OrderDate VARCHAR,
    OrderStatus VARCHAR,
    OrderTotal decimal,
    OrderLoyaltyPoints decimal)
WITH (format = 'TEXTFILE',
    skip_header_line_count = 1,
    csv_escape = '\',
    csv_quote = '"',  
    csv_separator = ',',
    external_location = 's3a://palaniappas3/SalesOrders/')
;
=======
show schemas from hive;


# mysql
create user 'dpuser'@'localhost' identified with mysql_native_password by 'dpuser';
grant ALL PRIVILEGES  ON DataplayGround  to 'dpuser'@'localhost';
FLUSH PRIVILEGES;


https://www.callicoder.com/spring-boot-security-oauth2-social-login-part-1/