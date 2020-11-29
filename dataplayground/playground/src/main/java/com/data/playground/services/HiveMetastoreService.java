package com.data.playground.services;

import com.data.playground.hivemetastore.ThriftHiveMetastoreClient;
import com.data.playground.model.data.dto.TableDTO;
import com.data.playground.model.data.dto.TableField;
import com.data.playground.repositories.entity.Catalog;
import com.data.playground.util.TableCommandParser;
import com.google.common.net.HostAndPort;
import org.apache.hadoop.hive.metastore.api.FieldSchema;
import org.apache.hadoop.hive.metastore.api.SerDeInfo;
import org.apache.hadoop.hive.metastore.api.StorageDescriptor;
import org.apache.hadoop.hive.metastore.api.Table;
import org.apache.thrift.TException;
import org.apache.thrift.transport.TTransportException;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class HiveMetastoreService {

    private ThriftHiveMetastoreClient hiveMetastoreClient;

    public HiveMetastoreService() throws TTransportException {
        this.hiveMetastoreClient = new ThriftHiveMetastoreClient(HostAndPort.fromParts("localhost", 9083));
    }

    public Table upsertTable(Catalog catalog, TableDTO tableDTO) throws Exception {

        try {
            hiveMetastoreClient.dropTable(catalog.getDatabaseName(), tableDTO.getTableName(), false);
        } catch (Exception e) {
            //ignore
        }

        Table table = new Table();
        table.setDbName(catalog.getDatabaseName());
        table.setTableName(tableDTO.getTableName());
        table.setTableType("EXTERNAL_TABLE");
        table.setParameters(new HashMap<>());
        table.getParameters().put("skip.header.line.count", "1");
        table.getParameters().put("EXTERNAL", "true");
        table.getParameters().put("numFiles", "1");
        table.getParameters().put("bucketing_version", "2");

        StorageDescriptor sd = new StorageDescriptor();
        for (TableField f : tableDTO.getFields()) {
            FieldSchema fs = new FieldSchema();
            fs.setName(f.getFieldName());
            fs.setType(TableCommandParser.getHiveFieldTypeString(f.getFieldType()));
            sd.addToCols(fs);
        }
        sd.setLocation(tableDTO.getLocationPath());
        sd.setInputFormat("org.apache.hadoop.mapred.TextInputFormat");
        sd.setOutputFormat("org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat");

        SerDeInfo serDeInfo = new SerDeInfo();
        serDeInfo.setSerializationLib("org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe");
        serDeInfo.setParameters(new HashMap<>());
        serDeInfo.getParameters().put("serialization.format", ",");
        serDeInfo.getParameters().put("escape.delim", "\\");
        serDeInfo.getParameters().put("field.delim", ",");

        sd.setSerdeInfo(serDeInfo);
        table.setSd(sd);


        this.hiveMetastoreClient.createTable(table);
        return this.getTable(catalog.getDatabaseName(), tableDTO.getTableName());
    }

    public Table getTable(String databaseName, String tableName) throws TException {
        Table table = this.hiveMetastoreClient.getTable(databaseName, tableName);
        return table;
    }
}
