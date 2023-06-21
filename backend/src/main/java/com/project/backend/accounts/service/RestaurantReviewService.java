package com.project.backend.accounts.service;

import com.project.backend.accounts.dto.RestaurantReviewDto;
import com.project.backend.accounts.repository.entity.RestaurantReview;
import com.project.backend.general.interfaces.Transfer;

import java.util.List;

public interface RestaurantReviewService extends Transfer {
    default RestaurantReviewDto entityToDto(RestaurantReview restaurantReview){
        RestaurantReviewDto dto = RestaurantReviewDto.builder()
                .user(restaurantReview.getUserId().getNickname())
                .restaurant(restaurantReview.getRestaurantId().getTitle())
                .review(restaurantReview.getReview())
                .reviewImg(restaurantReview.getReviewImg())
                .createdDate(restaurantReview.getCreatedDate())
                .build();
        return dto;
    }
    List<RestaurantReviewDto> getRestaurantReview(int restaurant_id);
}
