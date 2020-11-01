package com.data.playground.controllers;

import com.data.playground.hivemetastore.ThriftHiveMetastoreClient;
import com.data.playground.model.CreateTableRequest;
import com.data.playground.model.QueryRequest;
import com.data.playground.model.QueryResult;
import com.data.playground.model.ResultRecord;
import com.data.playground.model.datamodel.TableField;
import com.data.playground.util.TableCommandParser;
import com.google.common.net.HostAndPort;
import org.apache.hadoop.hive.metastore.api.FieldSchema;
import org.apache.hadoop.hive.metastore.api.SerDeInfo;
import org.apache.hadoop.hive.metastore.api.StorageDescriptor;
import org.apache.hadoop.hive.metastore.api.Table;
import org.apache.thrift.TException;
import org.apache.thrift.transport.TTransportException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/datamodel")
public class DataModelController {

    private static String driverClass = "org.apache.hive.jdbc.HiveDriver";
    private static String DEFAULT_DB_NAME = "default";

    @RequestMapping(value = "/createTable", method = RequestMethod.POST)
    public ResponseEntity<Object> createTable(@RequestBody CreateTableRequest createTableRequest) throws Exception {

        String createSql = TableCommandParser.getHiveCreateExternalTableCommand(createTableRequest);

        Connection connection = DriverManager.getConnection("jdbc:hive2://localhost:10000/default", "anonymous", "anonymous");
        Statement statement = connection.createStatement();

        String table = "CUSTOMER";
        try {
            statement.execute("DROP TABLE " + createTableRequest.getTableName());
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        statement.execute(createSql);

        String sql = "SHOW TABLES '" + createTableRequest.getTableName() + "'";
        System.out.println("Executing Show table: " + sql);
        ResultSet result = statement.executeQuery(sql);
        String resultStatus = "Created Table ";
        if (result.next()) {
            resultStatus = resultStatus + result.getString(1);
            System.out.println("Table created is :" + result.getString(1));
        }

        result.close();

        statement.close();

        connection.close();
        return new ResponseEntity<>(resultStatus, HttpStatus.CREATED);

    }

    @RequestMapping(value = "/createDirectHiveTable", method = RequestMethod.POST)
    public ResponseEntity<Object> createDirectHiveTable(@RequestBody CreateTableRequest createTableRequest) throws Exception {


        ThriftHiveMetastoreClient client = new ThriftHiveMetastoreClient(HostAndPort.fromParts("localhost", 9083));

        try {
            client.dropTable(DEFAULT_DB_NAME, createTableRequest.getTableName(), false);
        } catch (Exception e) {
            //ignore
        }

        Table table = new Table();
        table.setDbName(DEFAULT_DB_NAME);
        table.setTableName(createTableRequest.getTableName());
        table.setTableType("EXTERNAL_TABLE");
        table.setParameters(new HashMap<>());
        table.getParameters().put("skip.header.line.count", "1");
        table.getParameters().put("EXTERNAL", "true");
        table.getParameters().put("numFiles", "1");
        table.getParameters().put("bucketing_version", "2");

        StorageDescriptor sd = new StorageDescriptor();
        for (TableField f : createTableRequest.getFields()) {
            FieldSchema fs = new FieldSchema();
            fs.setName(f.getFieldName());
            fs.setType(TableCommandParser.getHiveFieldTypeString(f.getFieldType()));
            sd.addToCols(fs);
        }
        sd.setLocation(createTableRequest.getLocationPath());
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


        client.createTable(table);

        return new ResponseEntity<>(table, HttpStatus.CREATED);

    }

    @RequestMapping(value = "/getTable", method = RequestMethod.GET)
    public ResponseEntity<Object> getTable(@RequestParam String tableName) throws TException {

        String databaseName = "default";
        ThriftHiveMetastoreClient client = new ThriftHiveMetastoreClient(HostAndPort.fromParts("localhost", 9083));
        Table table = client.getTable(databaseName, tableName);
        return new ResponseEntity<>(table, HttpStatus.OK);

    }
}
