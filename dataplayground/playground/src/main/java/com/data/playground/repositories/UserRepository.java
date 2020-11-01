package com.data.playground.repositories;

import com.data.playground.repositories.entity.UserModel;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserModel,String> {
}
