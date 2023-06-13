package com.project.backend.accounts.repository;

import com.project.backend.accounts.repository.entity.RestaurantLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantLikeRepository extends JpaRepository<RestaurantLike,Integer> {
}
