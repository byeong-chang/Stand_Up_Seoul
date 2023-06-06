package com.project.backend.restaurants.repository;

import com.project.backend.restaurants.repository.entity.RestaurantRuntime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRuntimeRepository extends JpaRepository<RestaurantRuntime,Integer> {
}
