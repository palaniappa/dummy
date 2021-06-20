package com.parquet.model;

import java.util.ArrayList;
import java.util.List;

public class Table {
    private String tableName;
   List<Row> rows = new ArrayList<>();
   List<ColumnMetadata> columnMetadata = new ArrayList<>();

    public List<ColumnMetadata> getColumnMetadata() {
        return columnMetadata;
    }

    public void setColumnMetadata(List<ColumnMetadata> columnMetadata) {
        this.columnMetadata = columnMetadata;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public List<Row> getRows() {
        return rows;
    }

    public void setRows(List<Row> rows) {
        this.rows = rows;
    }

    public void print(int rows) {
        System.out.println("");
        for(int i=0;i<this.columnMetadata.size();++i) {

            System.out.print(" | " + columnMetadata.get(i).getName());
            if(i==this.columnMetadata.size()-1){
                System.out.print(" |");
            }
        }
        System.out.println("");

        for(int i=0;i<this.getRows().size()&&i<rows;++i) {
            this.getRows().get(i).print(this.columnMetadata);
            System.out.println("");
        }
    }
}
