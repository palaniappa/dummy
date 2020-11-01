package com.data.playground.model;

import org.apache.hadoop.hive.metastore.api.Table;

public class CreateTableResponse {
    private Table createdTable;

    public Table getCreatedTable() {
        return createdTable;
    }

    public void setCreatedTable(Table createdTable) {
        this.createdTable = createdTable;
    }
}
