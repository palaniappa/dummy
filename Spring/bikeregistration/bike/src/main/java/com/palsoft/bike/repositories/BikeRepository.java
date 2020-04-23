package com.palsoft.bike.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.palsoft.bike.models.Bike;

public interface BikeRepository extends JpaRepository<Bike, Long> {

}
