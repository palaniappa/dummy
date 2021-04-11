package com.data.playground.processors;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.repositories.entity.Catalog;
import com.data.playground.repositories.entity.DPTable;
import com.data.playground.util.CommonUtil;
import net.sf.jsqlparser.expression.Alias;
import net.sf.jsqlparser.schema.Table;
import net.sf.jsqlparser.statement.select.Select;
import net.sf.jsqlparser.statement.select.WithItem;
import net.sf.jsqlparser.util.TablesNamesFinder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PhysicalTableResolver extends TablesNamesFinder {

    private Map<String,DPTable> tableMap;
    private Map<String,Catalog> catalogMap;
    private Map<String, String> tablesFailedResolution;
    private Map<String, String> tableAliases;

    public PhysicalTableResolver(Map<String, DPTable> tableMap, Map<String, Catalog> catalogMap) {
        this.catalogMap = catalogMap;
        this.tableMap = tableMap;
        this.tablesFailedResolution = new HashMap<>();
        this.tableAliases = new HashMap<>();
    }

    public boolean getProcessedStatement(Select statement) {
        this.init(true);
        this.tablesFailedResolution = new HashMap<>();
        this.tableAliases = new HashMap<>();
        statement.accept(this);
        this.tableAliases.values().forEach( a -> {
            this.tablesFailedResolution.remove(a);
        });
        return this.tablesFailedResolution.size() == 0;
    }

    public String getError(){
        StringBuilder tableNames = new StringBuilder();
        boolean first = true;
        for(String table : this.tablesFailedResolution.values()) {
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
    public void visit(WithItem withItem) {
        super.visit(withItem);
        this.tableAliases.put(withItem.getName().toLowerCase(),withItem.getName().toLowerCase());
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

            Alias alias = tableName.getAlias();
            if(alias != null && !CommonUtil.isEmpty(alias.getName())) {
                this.tableAliases.put(alias.getName(), alias.getName());
            }
        }
        if(failed) {
            tablesFailedResolution.put(tableName.getName(),tableName.getName());
        }

    }

}
