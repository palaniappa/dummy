package com.data.playground.exception;


import org.springframework.http.HttpStatus;


public class PlaygroundException extends Exception {

    HttpStatus errorStatus;

    public PlaygroundException(String errorMessage) {
        super(errorMessage);
        this.errorStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public PlaygroundException(HttpStatus errorStatus, String message) {
        super(message);
        this.errorStatus = errorStatus;

    }

    public HttpStatus getErrorStatus() {
        return errorStatus;
    }

}
