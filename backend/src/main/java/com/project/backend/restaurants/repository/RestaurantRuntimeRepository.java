package com.project.backend.restaurants.repository;

import com.project.backend.restaurants.repository.entity.RestaurantRuntime;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RestaurantRuntimeRepository extends JpaRepository<RestaurantRuntime, Integer>{

}