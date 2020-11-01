package com.data.playground.controllers;

import com.data.playground.model.datamodel.UserModel;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<UserModel> login(@RequestParam String useremail) {

    return  new ResponseEntity<>(null, HttpStatus.OK);

    }
}
