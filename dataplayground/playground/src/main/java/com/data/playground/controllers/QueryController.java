package com.data.playground.controllers;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

import com.data.playground.model.query.dto.QueryResult;
import com.data.playground.model.query.dto.ResultColumnInfo;
import com.data.playground.model.query.dto.ResultRecord;
import com.data.playground.repositories.entity.UserModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.data.playground.model.query.dto.QueryRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value="/query")
public class QueryController {

	@RequestMapping(value="/sql", method = RequestMethod.POST)
	public ResponseEntity<Object> runSql(@RequestBody QueryRequest queryRequest) throws SQLException{
		String url = "jdbc:presto://localhost:8080/";
		Connection connection = (Connection) DriverManager.getConnection(url, "pramanathan", null);

		UserModel user = (UserModel)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		System.out.println(String.format("Query from user %s",user.getId()));

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
		} catch (SQLException e ) {
		    e.printStackTrace();
		    return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		} finally {
		    if (stmt != null) { stmt.close(); }
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}

