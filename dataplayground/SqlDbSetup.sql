drop table DP_User;

create table DP_User ( id varchar(255), user_name varchar(255), user_email varchar(255));
select * from DP_User;


drop table DP_Catalog;

create table DP_Catalog( id varchar(255), user_id varchar(255), name varchar(255), connector_id varchar(255), catalog_type varchar(255), properties varchar(10000));
select * from DP_Catalog;

alter table DP_Catalog add column (database_name varchar(255));

update DP_Catalog set database_name = 'default'; 

select id, name, connector_id, catalog_type, properties from DP_Catalog where id = 'palani_s3_one';

drop table DP_Table;

delete from DP_Table where catalog_id = 'orders_erp1' and name = '';

create table DP_Table ( id varchar(255), user_id varchar(255), name varchar(255)
, catalog_id varchar(255) );

select * from DP_Table;

alter table DP_Table drop column database_name;


delete from DP_Catalog where properties = '{}';


select * from DP_Database;


select * from DP_Catalog;

select count(user_id), count(database_name) from DP_Catalog;

insert into DP_Table values ('customers','palaniappa@gmail.com','customers','default','CUSTOMER_DATA');