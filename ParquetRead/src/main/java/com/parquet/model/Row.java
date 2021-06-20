package com.parquet.model;

import java.util.ArrayList;
import java.util.List;

public class Row extends ArrayList<Object> {

    public void print(List<ColumnMetadata> columnMetadataList) {
        for(int i=0;i<this.size();++i) {

            System.out.print(" | " + get(i).toString());
            if(i==this.size()-1){
                System.out.print(" |");
            }
        }
    }
}
