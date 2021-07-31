import sys
sys.path.insert(1, '/Volumes/HDD2/repos/trino-python-client')
import trino as t
import pandas as pd
import time

print('Welcome to Trino client using python-client')
startTime = time.time()
conn = t.dbapi.connect(
    host='localhost',
    port=8080,
    user='admin',
    catalog='tpcds',
    schema='tiny',
)
cur = conn.cursor()
cur.execute('SELECT * FROM store_sales')
metadata = cur.getMetadata()
rows = cur.fetchall()
dataFrame = pd.DataFrame(rows)
colNames = []
for col in metadata:
    colNames.append(col['name'])
dataFrame.columns = colNames

dataFrame['ss_wholesale_cost'] = pd.to_numeric(dataFrame['ss_wholesale_cost'])
dataFrame['ss_list_price'] = pd.to_numeric(dataFrame['ss_list_price'])
dataFrame['ss_sales_price'] = pd.to_numeric(dataFrame['ss_sales_price'])
dataFrame['ss_ext_discount_amt'] = pd.to_numeric(dataFrame['ss_ext_discount_amt'])
dataFrame['ss_ext_sales_price'] = pd.to_numeric(dataFrame['ss_ext_sales_price'])
dataFrame['ss_ext_wholesale_cost'] = pd.to_numeric(dataFrame['ss_ext_wholesale_cost'])
dataFrame['ss_ext_list_price'] = pd.to_numeric(dataFrame['ss_ext_list_price'])
dataFrame['ss_ext_tax'] = pd.to_numeric(dataFrame['ss_ext_tax'])
dataFrame['ss_coupon_amt'] = pd.to_numeric(dataFrame['ss_coupon_amt'])
dataFrame['ss_net_paid'] = pd.to_numeric(dataFrame['ss_net_paid'])
dataFrame['ss_net_paid_inc_tax'] = pd.to_numeric(dataFrame['ss_net_paid_inc_tax'])
dataFrame['ss_net_profit'] = pd.to_numeric(dataFrame['ss_net_profit'])
#print(dataFrame.dtypes)

print(dataFrame.groupby(['ss_item_sk'])['ss_net_profit'].sum())
endTime = time.time()
elapsed = endTime - startTime
print ('Time taken ',elapsed)
