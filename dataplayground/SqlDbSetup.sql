drop table DP_User;

create table DP_User ( id varchar(255), user_name varchar(255), user_email varchar(255));

drop table DP_UserCatalog;

create table DP_UserCatalog( id varchar(255), user_id varchar(255), catalog_name_value varchar(255), access_key varchar(255), secret_key varchar(255));

select * from DP_User;

select * from DP_UserCatalog;

create table DP_Catalog( id varchar(255), user_id varchar(255), name varchar(255), access_key varchar(255), secret_key varchar(255));
