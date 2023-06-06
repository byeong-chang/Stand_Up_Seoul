package com.project.backend.restaurants.repository;

import com.project.backend.restaurants.repository.entity.RestaurantBreaktime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantBreaktimeRepository extends JpaRepository<RestaurantBreaktime,Integer> {
}
