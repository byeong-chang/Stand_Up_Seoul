package com.project.backend.accounts.repository;

import com.project.backend.accounts.repository.entity.RestaurantLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RestaurantLikeRepository extends JpaRepository<RestaurantLike,Integer> {
    @Query(value = "select * from restaurant_like where restaurant_id = :restaurantId and users_id = :userId",nativeQuery = true)
    RestaurantLike findByUserIdAndRestaurantId(@Param("restaurantId") int restaurantId,@Param("userId") int userId);
}
