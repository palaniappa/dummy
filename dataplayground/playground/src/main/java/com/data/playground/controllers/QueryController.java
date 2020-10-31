package com.data.playground.controllers;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

import com.data.playground.model.QueryResult;
import com.data.playground.model.ResultRecord;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.data.playground.model.QueryRequest;

@RestController
@RequestMapping(value="/query")
public class QueryController {

	@RequestMapping(value="/sql", method = RequestMethod.POST)
	public ResponseEntity<Object> runSql(@RequestBody QueryRequest queryRequest) throws SQLException{
		String url = "jdbc:presto://localhost:8080/";
		Connection connection = (Connection) DriverManager.getConnection(url, "pramanathan", null);
		
		Statement stmt = null;
		QueryResult result = new QueryResult();
		result.setDone(true);
		String query = queryRequest.getSql();
		//String query = "select * from mydb.public.testtable";
		try {
		    stmt = connection.createStatement();
		    ResultSet rs = stmt.executeQuery(query);
			ResultSetMetaData rsmd = rs.getMetaData();
			int columnCount = rsmd.getColumnCount();

			Map<Integer,String> columnNames = new HashMap<>();
			// The column count starts from 1
			for (int i = 1; i <= columnCount; i++ ) {
				String name = rsmd.getColumnName(i);
				columnNames.put(i,name);
				// Do stuff with name
			}

		    while (rs.next()) {
				ResultRecord record = new ResultRecord();
				for (int i = 1; i <= columnCount; i++ ) {
					Object data = rs.getObject(i);
					String columnName = columnNames.get(i);
					record.getProperties().put(columnName, data);
				}
				result.getRecords().add(record);
				result.setRecordCount(result.getRecordCount()+1);
		    }
		} catch (SQLException e ) {
		    e.printStackTrace();
		    return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		} finally {
		    if (stmt != null) { stmt.close(); }
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}

