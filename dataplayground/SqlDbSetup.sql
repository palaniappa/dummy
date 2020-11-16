drop table DP_User;

create table DP_User ( id varchar(255), user_name varchar(255), user_email varchar(255));
select * from DP_User;


drop table DP_Catalog;

create table DP_Catalog( id varchar(255), user_id varchar(255), name varchar(255), connector_id varchar(255), catalog_type varchar(255), properties varchar(10000));
select * from DP_Catalog;

select id, name, connector_id, catalog_type, properties from DP_Catalog where id = 'palani_s3_one';

create table DP_Database ( id varchar(255), user_id varchar(255), name varchar(255))

select * from DP_Catalog

delete from DP_Catalog where properties = '{}';

