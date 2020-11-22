package com.data.playground.controllers;

import java.sql.*;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.query.dto.QueryResult;
import com.data.playground.services.QueryService;
import net.sf.jsqlparser.JSQLParserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.data.playground.model.query.dto.QueryRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/query")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @RequestMapping(value = "/sql", method = RequestMethod.POST)
    public ResponseEntity<Object> runSql(@RequestBody QueryRequest queryRequest) throws JSQLParserException, SQLException, PlaygroundException {

		QueryResult result = this.queryService.runSql(queryRequest);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}

