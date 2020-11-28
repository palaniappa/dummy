package com.data.playground.controllers;

import au.com.bytecode.opencsv.CSVParser;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.AmazonS3URI;
import com.amazonaws.services.s3.model.*;
import com.data.playground.exception.PlaygroundException;
import com.data.playground.hivemetastore.ThriftHiveMetastoreClient;
import com.data.playground.model.data.dto.*;
import com.data.playground.repositories.entity.Catalog;
import com.data.playground.repositories.entity.DPTable;
import com.data.playground.services.*;
import com.data.playground.util.CommonUtil;
import com.data.playground.util.TableCommandParser;
import com.google.common.net.HostAndPort;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import org.apache.hadoop.hive.metastore.api.FieldSchema;
import org.apache.hadoop.hive.metastore.api.SerDeInfo;
import org.apache.hadoop.hive.metastore.api.StorageDescriptor;
import org.apache.hadoop.hive.metastore.api.Table;
import org.apache.thrift.TException;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

import static com.data.playground.util.TableCommandParser.getPlaygroundFieldType;

@RestController
@RequestMapping(value = "/table")
public class TableController {

    private static String driverClass = "org.apache.hive.jdbc.HiveDriver";

    @Autowired
    private CatalogService catalogService;
    @Autowired
    private TableService tableService;

    @RequestMapping(value = "/createTable",  method = RequestMethod.POST)
    public ResponseEntity<Table> createTable(@RequestBody TableDTO tableDTO) throws Exception {

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

        Table table = this.getHiveTable("default", tableDTO.getTableName());

        return new ResponseEntity<>(table, HttpStatus.CREATED);

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<TableDTO> create(@RequestBody TableDTO tableDTO) throws Exception {

        String userId = CommonUtil.getCurrentUserId();

        Optional<Catalog> catalog = this.catalogService.getCatalogByCatalogIdAndUserId(tableDTO.getCatalogId(), userId);
        if(catalog.isPresent() == false) {
            throw new PlaygroundException(String.format("Failed to get the catalog for the user with id %s", tableDTO.getCatalogId()));
        }

        DPTable dpTable = new DPTable();
        dpTable.setId(tableDTO.getTableName());
        dpTable.setCatalogId(tableDTO.getCatalogId());
        dpTable.setName(tableDTO.getTableName());
        dpTable.setUserId(userId);
        this.tableService.upsertTable(dpTable);

        ThriftHiveMetastoreClient client = new ThriftHiveMetastoreClient(HostAndPort.fromParts("localhost", 9083));

        try {
            client.dropTable(catalog.get().getDatabaseName(), tableDTO.getTableName(), false);
        } catch (Exception e) {
            //ignore
        }

        Table table = new Table();
        table.setDbName(catalog.get().getDatabaseName());
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

        table = this.getHiveTable(catalog.get().getDatabaseName(), table.getTableName());

        TableDTO resultTable = this.transformTableDto(dpTable, catalog.get(), table);

        return new ResponseEntity<>(resultTable, HttpStatus.CREATED);

    }

    @RequestMapping(value = "/{tableId}", method = RequestMethod.GET)
    public ResponseEntity<TableDTO> getTable(@PathVariable(value="tableId") String tableId) throws Exception {
        String userId = CommonUtil.getCurrentUserId();
        Optional<DPTable> dpTable = this.tableService.getTable(tableId,userId);
        if(dpTable.isPresent() == false) {
            throw new PlaygroundException(String.format("Failed to find the table with id %s", tableId));
        }

        Optional<Catalog> catalog = this.catalogService.getCatalogByCatalogIdAndUserId(dpTable.get().getCatalogId(), userId);
        if(catalog.isPresent() == false)
            throw  new PlaygroundException(String.format("Failed to get the catalog with id %s", dpTable.get().getCatalogId()));

        Table table = this.getHiveTable(catalog.get().getDatabaseName(), tableId);

        TableDTO tableDTO = this.transformTableDto(dpTable.get(), catalog.get(), table);

        return new ResponseEntity<>(tableDTO, HttpStatus.OK);

    }

    @RequestMapping(value = "/analyzeSchema", method = RequestMethod.POST)
    public ResponseEntity<TableSchema> getSchema(@RequestBody SchemaRequest schemaRequest) throws  Exception {

        if(schemaRequest == null
                || CommonUtil.isEmpty(schemaRequest.getCatalogId().trim())
                || CommonUtil.isEmpty(schemaRequest.getTableNameOrLocationPath().trim())
                ) {
            throw new PlaygroundException(HttpStatus.BAD_REQUEST,"Invalid catalog id");
        }

        schemaRequest.setTableNameOrLocationPath(schemaRequest.getTableNameOrLocationPath().trim());
        schemaRequest.setCatalogId(schemaRequest.getCatalogId().trim());

        String userId = CommonUtil.getCurrentUserId();

        Optional<Catalog> catalog =  this.catalogService.getCatalogByCatalogIdAndUserId(schemaRequest.getCatalogId(), userId);
        if(catalog.isPresent() == false) {
            throw new PlaygroundException(HttpStatus.BAD_REQUEST, "Catalog not found with id " + schemaRequest.getCatalogId());
        }

        SchemaAnalyzer schemaAnalyzer = null;
        if(catalog.get().getCatalogType().equals(CatalogService.CATALOG_TYPE_HIVE)) {
            schemaAnalyzer = new S3SchemaAnalyzer(catalog.get(), schemaRequest);
        }
        else if(catalog.get().getCatalogType().equals(CatalogService.CATALOG_TYPE_POSTGRESQL)) {
            schemaAnalyzer = new PostgreSQLSchemaAnalyzer(catalog.get(), schemaRequest);
        }
        else {
            throw new PlaygroundException(HttpStatus.INTERNAL_SERVER_ERROR, "Invalid catalog type");
        }

        TableSchema tableSchema = schemaAnalyzer.getSchema();
        return new ResponseEntity<>(tableSchema, HttpStatus.OK);
    }



    private TableDTO transformTableDto(DPTable dpTable, Catalog catalog, Table hiveTable) throws PlaygroundException{
        TableDTO tableDTO = new TableDTO();
        tableDTO.setTableName(dpTable.getName());
        tableDTO.setCatalogId(dpTable.getCatalogId());
        tableDTO.setDatabaseName(catalog.getDatabaseName());
        tableDTO.setLocationPath(hiveTable.getSd().getLocation());

        List<TableField> tableFields = new ArrayList<>();
        for(FieldSchema col : hiveTable.getSd().getCols()) {
            TableField tableField = new TableField();
            tableField.setFieldName(col.getName());
            tableField.setFieldType(getPlaygroundFieldType(col.getType()));
            tableFields.add(tableField);
        }

        tableDTO.setFields(tableFields);
        return  tableDTO;
    }

    private Table getHiveTable(String databaseName, String tableName) throws TException {
        ThriftHiveMetastoreClient client = new ThriftHiveMetastoreClient(HostAndPort.fromParts("localhost", 9083));
        Table table = client.getTable(databaseName, tableName);
        return table;
    }


}
