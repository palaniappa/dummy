package com.data.playground.services;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.data.dto.SchemaRequest;
import com.data.playground.model.data.dto.TableSchema;
import com.data.playground.repositories.entity.Catalog;

public class PostgreSQLSchemaAnalyzer extends SchemaAnalyzer {
    public PostgreSQLSchemaAnalyzer(Catalog catalog, SchemaRequest schemaRequest) {
        super(catalog, schemaRequest);
    }

    @Override
    public TableSchema getSchema() throws PlaygroundException {


        String connectionUrl = this.catalogConnectProperties.get("connection-url");
        String userName = this.catalogConnectProperties.get("connection-user");
        String password = this.catalogConnectProperties.get("connection-password");

        return null;
    }
}
