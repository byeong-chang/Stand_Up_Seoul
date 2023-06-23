package com.project.backend.accounts.repository;

import com.project.backend.accounts.repository.entity.RestaurantReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantReviewRepository extends JpaRepository<RestaurantReview, String> {
    @Query(value = "select * from restaurant_review where restaurant_id = :id", nativeQuery = true)
    List<RestaurantReview> findrestaurants(@Param("id") int id);
    RestaurantReview findById(int id);
    RestaurantReview deleteById(RestaurantReview restaurantReview);
}
