package com.data.playground.exception;

import com.data.playground.model.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleExceptions(Exception exception, WebRequest webRequest) {

        ExceptionResponse error = new ExceptionResponse();
        error.setMessage(exception.getMessage());
        error.setPath(webRequest.getContextPath());
        error.setError(exception);
        ResponseEntity<Object> entity = new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        return entity;
    }
}
