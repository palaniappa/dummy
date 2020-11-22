package com.data.playground.processors;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.repositories.entity.Catalog;
import com.data.playground.repositories.entity.DPTable;
import net.sf.jsqlparser.schema.Table;
import net.sf.jsqlparser.statement.select.Select;
import net.sf.jsqlparser.util.TablesNamesFinder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PhysicalTableResolver extends TablesNamesFinder {

    private Map<String,DPTable> tableMap;
    private Map<String,Catalog> catalogMap;
    private List<String> tablesFailedResolution;

    public PhysicalTableResolver(Map<String, DPTable> tableMap, Map<String, Catalog> catalogMap) {
        this.catalogMap = catalogMap;
        this.tableMap = tableMap;
        this.tablesFailedResolution = new ArrayList<>();
    }

    public boolean getProcessedStatement(Select statement) {
        this.init(true);
        this.tablesFailedResolution = new ArrayList<>();
        statement.accept(this);
        return this.tablesFailedResolution.size() == 0;
    }

    public String getError(){
        StringBuilder tableNames = new StringBuilder();
        boolean first = true;
        for(String table : this.tablesFailedResolution) {
            if(!first) {
                tableNames.append(", ");
            }
            tableNames.append("'");
            tableNames.append(table);
            tableNames.append("'");
            first = false;
        }
        return String.format("The table(s) %s failed resolution",tableNames.toString());
    }

    @Override
    public void visit(Table tableName) {
        super.visit(tableName);

        //Now replace the table name
        boolean failed = true;
        if(this.tableMap.containsKey(tableName.getName())) {
            DPTable table = this.tableMap.get(tableName.getName());
            if(this.catalogMap.containsKey(table.getCatalogId())) {
                Catalog catalog = this.catalogMap.get(table.getCatalogId());
                tableName.setName(String.format("%s.%s.%s",catalog.getId(), catalog.getDatabaseName(), table.getId()));
                failed = false;
            }
        }
        if(failed) {
            tablesFailedResolution.add(tableName.getName());
        }

    }

}
