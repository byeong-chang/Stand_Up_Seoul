package com.project.backend.accounts.service;

import com.project.backend.accounts.dto.RestaurantReviewDto;
import com.project.backend.accounts.repository.RestaurantReviewRepository;
import com.project.backend.accounts.repository.entity.RestaurantReview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantReviewServiceImpl implements RestaurantReviewService{

    public final RestaurantReviewRepository restaurantReviewRepository;

    @Autowired
    public RestaurantReviewServiceImpl(RestaurantReviewRepository restaurantReviewRepository) {
        this.restaurantReviewRepository = restaurantReviewRepository;
    }

    @Override
    public Object transfer(Object entity) {
        RestaurantReviewDto dto = entityToDto((RestaurantReview) entity);
        return dto;
    }

    @Override
    public List<RestaurantReviewDto> getRestaurantReview(int restaurant_id) {
        List<RestaurantReviewDto> restaurantReviewDtos = new ArrayList<>();
        for (RestaurantReview restaurantReview : restaurantReviewRepository.findrestaurants(restaurant_id)) {
            restaurantReviewDtos.add((RestaurantReviewDto) transfer(restaurantReview));
        }
        return restaurantReviewDtos;
    }
}
