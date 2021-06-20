package com.parquet.model;

public class ColumnMetadata {
    private String name;
    private ColumnType columnType;

    public ColumnMetadata(String name, ColumnType columnType) {
        this.name = name;
        this.columnType = columnType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ColumnType getColumnType() {
        return columnType;
    }

    public void setColumnType(ColumnType columnType) {
        this.columnType = columnType;
    }
}
