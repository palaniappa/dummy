package com.data.playground.services;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.query.dto.QueryRequest;
import com.data.playground.model.query.dto.QueryResult;
import com.data.playground.model.query.dto.ResultColumnInfo;
import com.data.playground.model.query.dto.ResultRecord;
import com.data.playground.processors.PhysicalTableResolver;
import com.data.playground.repositories.entity.Catalog;
import com.data.playground.repositories.entity.DPTable;
import com.data.playground.util.CommonUtil;
import net.sf.jsqlparser.JSQLParserException;
import net.sf.jsqlparser.parser.CCJSqlParserUtil;
import net.sf.jsqlparser.statement.select.Select;
import net.sf.jsqlparser.util.SelectUtils;
import net.sf.jsqlparser.util.TablesNamesFinder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.Utilities;
import java.sql.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QueryService {

    @Autowired
    private TableService tableService;

    @Autowired
    private  CatalogService catalogService;

    private final String PRESTO_SERVER_URL = "jdbc:presto://localhost:8080/";
    private Connection connection;
    QueryService() throws SQLException {
        this.connection = (Connection) DriverManager.getConnection(PRESTO_SERVER_URL, "pramanathan", null);
    }

    public QueryResult runSql(QueryRequest queryRequest) throws JSQLParserException, SQLException, PlaygroundException {
        String query = this.getPhysicalTableResolvedSql(queryRequest);

        Statement stmt = null;
        QueryResult result = new QueryResult();
        result.setDone(true);

        //String query = "select * from mydb.public.testtable";
        try {
            stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            Map<Integer,String> columnNames = new HashMap<>();
            for (int i = 1; i <= columnCount; i++ ) {
                String name = rsmd.getColumnName(i);
                columnNames.put(i,name);

                ResultColumnInfo resultColumnInfo = new ResultColumnInfo();
                resultColumnInfo.setColumnName(rsmd.getColumnName(i));
                resultColumnInfo.setColumnLabel(rsmd.getColumnLabel(i));
                resultColumnInfo.setColumnType(rsmd.getColumnTypeName(i));

                result.getColumns().add(resultColumnInfo);
            }

            while (rs.next()) {
                ResultRecord record = new ResultRecord();
                for (int i = 1; i <= columnCount; i++ ) {
                    Object data = rs.getObject(i);
                    String columnName = columnNames.get(i);
                    record.put(columnName, data);
                }
                result.getRecords().add(record);
                result.setRecordCount(result.getRecordCount()+1);
            }
        }
        finally {
            if (stmt != null) { stmt.close(); }
        }
        return result;
    }

    private String getPhysicalTableResolvedSql(QueryRequest queryRequest) throws JSQLParserException, PlaygroundException {

        net.sf.jsqlparser.statement.Statement queryStatement = CCJSqlParserUtil.parse(queryRequest.getSql());

        Select selectStatement = (Select) queryStatement;
        TablesNamesFinder tablesNamesFinder = new TablesNamesFinder();
        List<String> tableList = tablesNamesFinder.getTableList(selectStatement);

        String userId = CommonUtil.getCurrentUserId();
        List<DPTable> tables = this.tableService.getTables(tableList, userId);

        Map<String, DPTable> tableIdToDPTable = new HashMap<>();
        Map<String, String> catalogIds = new HashMap<>();
        tables.forEach( t -> {
            tableIdToDPTable.put(t.getId(), t);
            catalogIds.put(t.getCatalogId(),t.getCatalogId());
        });

        List<Catalog> dpCatalogs = this.catalogService.getCatalogs(catalogIds.values().stream().collect(Collectors.toList())
                , userId);

        Map<String,Catalog> catalogIdToDPCatalog = new HashMap<>();
        dpCatalogs.forEach( c -> {
            catalogIdToDPCatalog.put(c.getId(),c);
        });

        PhysicalTableResolver tableResolver = new PhysicalTableResolver(tableIdToDPTable, catalogIdToDPCatalog);
        if(!tableResolver.getProcessedStatement(selectStatement)) {
            throw new PlaygroundException(tableResolver.getError());
        }


        String physicalQuery = selectStatement.toString();
        return physicalQuery;

    }
}
