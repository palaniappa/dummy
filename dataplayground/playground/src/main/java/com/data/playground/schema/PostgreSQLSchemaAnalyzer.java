package com.data.playground.schema;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.data.dto.FieldType;
import com.data.playground.model.data.dto.SchemaRequest;
import com.data.playground.model.data.dto.TableField;
import com.data.playground.model.data.dto.TableSchema;
import com.data.playground.repositories.entity.Catalog;
import com.data.playground.services.PostgreSQLService;
import java.util.List;

public class PostgreSQLSchemaAnalyzer extends SchemaAnalyzer {


    private static PostgreSQLService postgreSQLService = new PostgreSQLService();

    public PostgreSQLSchemaAnalyzer(Catalog catalog, SchemaRequest schemaRequest) {
        super(catalog, schemaRequest);
    }

    @Override
    public TableSchema getSchema() throws PlaygroundException {

        List<TableField> fields = this.postgreSQLService.getTableFields(catalog
                , schemaRequest.getTableNameOrLocationPath());

        TableSchema tableSchema = new TableSchema();
        tableSchema.setSamplesRows(null);
        tableSchema.setFields(fields);
        return  tableSchema;
    }


}
