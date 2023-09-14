package com.project.backend.restaurants.repository;

import com.project.backend.restaurants.repository.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant,Integer> {
    Restaurant findById(int restaurantId);

    List<Restaurant> findByTitleContaining(String search);
}
