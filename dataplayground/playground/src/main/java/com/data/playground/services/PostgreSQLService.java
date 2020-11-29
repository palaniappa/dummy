package com.data.playground.services;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.data.dto.FieldType;
import com.data.playground.model.data.dto.TableField;
import com.data.playground.model.data.dto.TableSchema;
import com.data.playground.repositories.entity.Catalog;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PostgreSQLService {

    public List<TableField> getTableFields(
            Catalog catalog
            , String tableName
    ) throws PlaygroundException {

        Gson gson = new Gson();
        Type type = new TypeToken<Map<String, String>>() {
        }.getType();
        Map<String,String> catalogProps = gson.fromJson(catalog.getProperties(), type);

        String connectionUrl = catalogProps.get("connection-url");
        String userName = catalogProps.get("connection-user");
        String password = catalogProps.get("connection-password");

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
                    , tableName);

            statement = connection.createStatement();
            rs = statement.executeQuery(sqlStatement);
            List<TableField> fields = new ArrayList<>();
            while (rs.next()) {
                TableField field = new TableField();
                field.setFieldName(rs.getString(1));
                field.setFieldType(this.getFieldType(rs.getString(2)));
                fields.add(field);
                System.out.println(rs.getString(1) + ":" + rs.getString(2));
            }
            return fields;
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            throw new PlaygroundException(e.getMessage());
        } finally {
            try {
                if (statement != null) {
                    statement.close();
                }

                if (rs != null) {
                    rs.close();
                }

                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException sqlException) {
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
