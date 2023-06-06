package com.project.backend.restaurants.repository;

import com.project.backend.restaurants.repository.entity.RestaurantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantCategoryRepository extends JpaRepository<RestaurantCategory,Integer> {
}
