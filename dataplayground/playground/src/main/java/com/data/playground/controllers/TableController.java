package com.data.playground.controllers;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.data.dto.*;
import com.data.playground.repositories.entity.Catalog;
import com.data.playground.repositories.entity.DPTable;
import com.data.playground.schema.PostgreSQLSchemaAnalyzer;
import com.data.playground.schema.S3SchemaAnalyzer;
import com.data.playground.schema.SchemaAnalyzer;
import com.data.playground.services.*;
import com.data.playground.util.CommonUtil;
import com.data.playground.util.TableCommandParser;
import org.apache.hadoop.hive.metastore.api.FieldSchema;
import org.apache.hadoop.hive.metastore.api.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.*;

import static com.data.playground.util.TableCommandParser.getPlaygroundFieldType;

@RestController
@RequestMapping(value = "/table")
public class TableController {

    private static String driverClass = "org.apache.hive.jdbc.HiveDriver";

    @Autowired
    private CatalogService catalogService;

    @Autowired
    private TableService tableService;

    @Autowired
    private PostgreSQLService postgreSQLService;

    @Autowired
    private HiveMetastoreService hiveMetastoreService;

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

        Table table = this.hiveMetastoreService.getTable("default", tableDTO.getTableName());

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

        TableDTO resultTable = null;
        if(catalog.get().getCatalogType().equals(CatalogService.CATALOG_TYPE_HIVE)) {
            Table hiveTable = this.hiveMetastoreService.upsertTable(catalog.get(), tableDTO);
            resultTable = this.transformTableDto(dpTable, catalog.get(), hiveTable);
        }
        else if(catalog.get().getCatalogType().equals(CatalogService.CATALOG_TYPE_POSTGRESQL)) {
            List<TableField> fields = this.postgreSQLService.getTableFields(catalog.get(), tableDTO.getTableName());
            resultTable = this.transformTableDto(dpTable, catalog.get(), fields);
        }
        else {
            throw new PlaygroundException("Unsupported catalog type!");
        }
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

        TableDTO resultTable = null;
        if(catalog.get().getCatalogType().equals(CatalogService.CATALOG_TYPE_HIVE)) {
            Table table = this.hiveMetastoreService.getTable(catalog.get().getDatabaseName(), tableId);
            resultTable = this.transformTableDto(dpTable.get(), catalog.get(), table);
        }
        else if(catalog.get().getCatalogType().equals(CatalogService.CATALOG_TYPE_POSTGRESQL)) {
            List<TableField> fields = this.postgreSQLService.getTableFields(catalog.get(), tableId);
            resultTable = this.transformTableDto(dpTable.get(), catalog.get(), fields);
        }
        return new ResponseEntity<>(resultTable, HttpStatus.OK);

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


    @RequestMapping(value = "/{tableId}", method = RequestMethod.DELETE)
    public ResponseEntity<String> delete(@PathVariable(value="tableId") String tableId) throws Exception {
        String userId = CommonUtil.getCurrentUserId();
        Optional<DPTable> dpTable = this.tableService.getTable(tableId,userId);
        Optional<Catalog> catalog = this.catalogService.getCatalogByCatalogIdAndUserId(dpTable.get().getCatalogId(), userId);
        if(dpTable.isPresent() && catalog.isPresent()) {
            if(catalog.get().getCatalogType().equals(CatalogService.CATALOG_TYPE_HIVE)) {
                //this.hiveMetastoreService
            }
            this.tableService.delete(tableId, userId);
        }
        return new ResponseEntity<>(tableId, HttpStatus.OK);
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

    private TableDTO transformTableDto(DPTable dpTable, Catalog catalog, List<TableField> fields) throws PlaygroundException{
        TableDTO tableDTO = new TableDTO();
        tableDTO.setTableName(dpTable.getName());
        tableDTO.setCatalogId(dpTable.getCatalogId());
        tableDTO.setDatabaseName(catalog.getDatabaseName());
        tableDTO.setLocationPath(dpTable.getId());
        tableDTO.setFields(fields);
        return  tableDTO;
    }

}
