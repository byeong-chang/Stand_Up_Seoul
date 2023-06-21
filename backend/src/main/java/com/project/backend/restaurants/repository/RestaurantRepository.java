package com.project.backend.restaurants.repository;

import com.project.backend.restaurants.repository.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RestaurantRepository extends JpaRepository<Restaurant,Integer> {
}
