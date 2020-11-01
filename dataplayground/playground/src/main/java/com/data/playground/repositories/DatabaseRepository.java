package com.data.playground.repositories;

import com.data.playground.repositories.entity.Database;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface DatabaseRepository extends JpaRepository<Database,String> {

    public Optional<Database> findOneByUserIdEquals(String userId);
}
