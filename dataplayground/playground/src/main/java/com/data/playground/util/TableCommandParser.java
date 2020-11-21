package com.data.playground.util;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.data.dto.TableDTO;
import com.data.playground.model.data.dto.FieldType;
import com.data.playground.model.data.dto.TableField;

public class TableCommandParser {

    public static String getHiveCreateExternalTableCommand(TableDTO request) throws Exception {
        String createSqlFormat = "create external table if not exists %s (%s) "
                + "row format delimited fields terminated by ',' "
                + "ESCAPED BY '\\\\' "
                + "stored as textfile "
                + "location '%s' "
                + "tblproperties (\"skip.header.line.count\"=\"1\") ";

        StringBuilder fieldsString = new StringBuilder();
        for (TableField f : request.getFields()) {
            String field = String.format(" %s %s", f.getFieldName(), getHiveFieldTypeString(f.getFieldType()));
            if (fieldsString.length() != 0) {
                fieldsString.append(", ");
            }
            fieldsString.append(field);

        }
        String createSql = String.format(createSqlFormat,request.getTableName(), fieldsString, request.getLocationPath());
        return createSql;
    }

    public static String getHiveFieldTypeString(FieldType ft) throws Exception {
        switch (ft) {
            case NUMBER:
                return "decimal(38,15)";
            case TEXT:
                return "varchar(1000)";
            case DATE:
                return "date";
            case DATETIME:
                ;
                return "timestamp";
        }
        throw new Exception("Failed to get the hive conversion for field type " + ft.toString());
    }

    public static FieldType getPlaygroundFieldType(String ft) throws PlaygroundException {
        switch (ft) {
            case "decimal(38,15)":
                return FieldType.NUMBER;
            case "varchar(1000)":
                return FieldType.TEXT;
            case "date":
                return FieldType.DATE;
            case "timestamp":
                return FieldType.DATETIME;
        }
        throw new PlaygroundException("Failed to get the hive conversion for field type " + ft.toString());
    }
}
