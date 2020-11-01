package com.data.playground.repositories;

import com.data.playground.model.entity.UserModel;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserModel,String> {
}
