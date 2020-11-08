package com.data.playground.services;

import com.data.playground.repositories.UserRepository;
import com.data.playground.repositories.entity.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserModel getOrRegisterUser(String userEmail, String userName) {
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
        return user;
    }

}
