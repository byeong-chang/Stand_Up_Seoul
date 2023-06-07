package com.project.backend.accounts.repository;

import com.project.backend.accounts.entity.RestaurantReview;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RestaurantReviewRepository extends JpaRepository<RestaurantReview, String> {
}
