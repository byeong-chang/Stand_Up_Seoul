package com.project.backend.restaurants.repository;

import com.project.backend.restaurants.repository.entity.RestaurantBreaktime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantBreaktimeRepository extends JpaRepository<RestaurantBreaktime,Integer> {
    @Query(value = "select * from restaurant_breaktime where restaurant_id = :id", nativeQuery = true)
    List<RestaurantBreaktime> findRestaurant(@Param("id") int id);
}
