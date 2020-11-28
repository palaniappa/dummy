package com.data.playground.services;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.data.dto.FieldType;
import com.data.playground.model.data.dto.SchemaRequest;
import com.data.playground.model.data.dto.TableField;
import com.data.playground.model.data.dto.TableSchema;
import com.data.playground.repositories.entity.Catalog;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PostgreSQLSchemaAnalyzer extends SchemaAnalyzer {
    public PostgreSQLSchemaAnalyzer(Catalog catalog, SchemaRequest schemaRequest) {
        super(catalog, schemaRequest);
    }

    @Override
    public TableSchema getSchema() throws PlaygroundException {


        String connectionUrl = this.catalogConnectProperties.get("connection-url");
        String userName = this.catalogConnectProperties.get("connection-user");
        String password = this.catalogConnectProperties.get("connection-password");

        Connection connection = null;
        Statement statement = null;
        ResultSet rs = null;
        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager
                    .getConnection(connectionUrl,
                            userName, password);

            String sqlStatement = String.format("select column_name, data_type  from information_schema.columns where table_schema = '%s' and table_name = '%s'"
                    , catalog.getDatabaseName()
                    , schemaRequest.getTableNameOrLocationPath());
            statement = connection.createStatement();
            rs = statement.executeQuery(sqlStatement);
            List<TableField> fields = new ArrayList<>();
            while(rs.next()) {
                TableField field = new TableField();
                field.setFieldName(rs.getString(1));
                field.setFieldType(this.getFieldType(rs.getString(2)));
                fields.add(field);
                System.out.println(rs.getString(1) + ":" + rs.getString(2));
            }

            TableSchema tableSchema = new TableSchema();
            tableSchema.setSamplesRows(null);
            tableSchema.setFields(fields);
            return  tableSchema;
        }
        catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getClass().getName()+": "+e.getMessage());
            throw new PlaygroundException(e.getMessage());
        }
        finally {
            try {
                if(statement != null) {
                    statement.close();
                }

                if(rs != null) {
                    rs.close();
                }

                if(connection != null) {
                    connection.close();
                }
            }
            catch (SQLException sqlException) {
                System.out.println(sqlException.getMessage());
            }

        }
    }

    private FieldType getFieldType(String fieldType) {
        switch (fieldType) {
            case "abstime":
            case "timestamp with time zone":
                return FieldType.DATETIME;
            case "interval":
            case "smallint":
            case "integer":
            case "boolean":
            case "numeric":
            case "bigint":
            case "double precision":
            case "real":
                return FieldType.NUMBER;
        }
        return FieldType.TEXT;
    }
}
