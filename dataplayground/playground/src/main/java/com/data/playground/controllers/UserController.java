package com.data.playground.controllers;

import com.data.playground.model.entity.UserModel;
import com.data.playground.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ResponseEntity<UserModel> login(@RequestParam String userEmail, @RequestParam String userName) {

        Optional<UserModel> existingUser =  this.userRepository.findById(userEmail);
        UserModel user;
        if(!existingUser.isPresent()) {
            user  = new UserModel();
            user.setId(userEmail);
            user.setUsername(userName);
            user.setUserEmail(userEmail);
            this.userRepository.save(user);
        }
        else {
            user = existingUser.get();
        }
        return  new ResponseEntity<>(user, HttpStatus.OK);

    }
}
