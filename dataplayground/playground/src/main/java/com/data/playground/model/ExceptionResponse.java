package com.data.playground.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpStatus;

import java.time.Instant;
import java.util.Date;

public class ExceptionResponse {
    private Instant timestamp;
    private String path;
    private int status;
    private String message;
    private String error;

    public ExceptionResponse() {
        this.timestamp = Instant.now();
        this.status = HttpStatus.SC_INTERNAL_SERVER_ERROR;
    }

    public String getTimestamp() {
        return timestamp.toString();
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public void setError(Throwable error) {

        ObjectMapper mapper = new ObjectMapper();
        try {
            this.error = mapper.writeValueAsString(error);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            this.error = "failed to serialize the exception";
        }

    }
}
