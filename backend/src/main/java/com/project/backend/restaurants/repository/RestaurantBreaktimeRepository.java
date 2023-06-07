package com.project.backend.restaurants.repository;

import com.project.backend.restaurants.repository.entity.RestaurantBreaktime;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RestaurantBreaktimeRepository extends JpaRepository<RestaurantBreaktime,Integer> {
}
