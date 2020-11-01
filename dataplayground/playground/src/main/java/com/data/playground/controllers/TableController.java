package com.data.playground.controllers;

import com.data.playground.hivemetastore.ThriftHiveMetastoreClient;
import com.data.playground.model.data.dto.TableField;
import com.data.playground.model.data.dto.TableDTO;
import com.data.playground.model.data.dto.TableResponseDTO;
import com.data.playground.repositories.DatabaseRepository;
import com.data.playground.repositories.entity.Database;
import com.data.playground.util.TableCommandParser;
import com.google.common.net.HostAndPort;
import org.apache.hadoop.hive.metastore.api.FieldSchema;
import org.apache.hadoop.hive.metastore.api.SerDeInfo;
import org.apache.hadoop.hive.metastore.api.StorageDescriptor;
import org.apache.hadoop.hive.metastore.api.Table;
import org.apache.thrift.Option;
import org.apache.thrift.TException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping(value = "/table")
public class TableController {

    private static String driverClass = "org.apache.hive.jdbc.HiveDriver";
    private static String DEFAULT_DB_NAME = "default";

    @Autowired
    private DatabaseRepository databaseRepository;

    @RequestMapping(value = "/createTable", method = RequestMethod.POST)
    public ResponseEntity<TableResponseDTO> createTable(@RequestBody TableDTO tableDTO) throws Exception {

        String createSql = TableCommandParser.getHiveCreateExternalTableCommand(tableDTO);

        Connection connection = DriverManager.getConnection("jdbc:hive2://localhost:10000/default", "anonymous", "anonymous");
        Statement statement = connection.createStatement();

        try {
            statement.execute("DROP TABLE " + tableDTO.getTableName());
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        statement.execute(createSql);

        statement.close();

        connection.close();

        Table table = this.getHiveTable(DEFAULT_DB_NAME, tableDTO.getTableName());

        TableResponseDTO res = new TableResponseDTO();
        res.setCreatedTable(table);

        return new ResponseEntity<>(res, HttpStatus.CREATED);

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<TableResponseDTO> create(@RequestBody TableDTO tableDTO) throws Exception {

        Database db = this.getUserDb(tableDTO.getUserId());

        ThriftHiveMetastoreClient client = new ThriftHiveMetastoreClient(HostAndPort.fromParts("localhost", 9083));

        try {
            client.dropTable(db.getName(), tableDTO.getTableName(), false);
        } catch (Exception e) {
            //ignore
        }

        Table table = new Table();
        table.setDbName(db.getName());
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


        client.createTable(table);

        table = this.getHiveTable(db.getName(), table.getTableName());
        TableResponseDTO res = new TableResponseDTO();
        res.setCreatedTable(table);

        return new ResponseEntity<>(res, HttpStatus.CREATED);

    }

    @RequestMapping(value = "/{userid}/{tableId}", method = RequestMethod.GET)
    public ResponseEntity<Table> getTable(@PathVariable(value="userId") String userId, @PathVariable(value="tableId") String tableId) throws Exception {
        Database db = this.getUserDb(userId);

        String dbName = db.getName();

        Table table = this.getHiveTable(dbName, tableId);
        return new ResponseEntity<>(table, HttpStatus.OK);

    }

    private Database getUserDb(String userId) throws Exception {
        Optional<Database> db = this.databaseRepository.findOneByUserIdEquals(userId);
        if(!db.isPresent()) {
            throw new Exception("Failed to find the user DB");
        }
        return db.get();
    }

    private Table getHiveTable(String databaseName, String tableName) throws TException {
        ThriftHiveMetastoreClient client = new ThriftHiveMetastoreClient(HostAndPort.fromParts("localhost", 9083));
        Table table = client.getTable(databaseName, tableName);
        return table;
    }

}
