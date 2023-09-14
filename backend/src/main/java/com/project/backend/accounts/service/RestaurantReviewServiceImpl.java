package com.project.backend.accounts.service;

import com.project.backend.accounts.dto.RestaurantReviewDto;
import com.project.backend.accounts.repository.RestaurantReviewRepository;
import com.project.backend.accounts.repository.entity.RestaurantReview;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RestaurantReviewServiceImpl implements RestaurantReviewService{

    public final RestaurantReviewRepository restaurantReviewRepository;

    @Override
    public Object transfer(Object entity) {
        RestaurantReviewDto dto = entityToDto((RestaurantReview) entity);
        return dto;
    }

    @Override
    public List<RestaurantReviewDto> getRestaurantReviews(int restaurant_id) {
        List<RestaurantReviewDto> restaurantReviewDtos = new ArrayList<>();
        for (RestaurantReview restaurantReview : restaurantReviewRepository.findrestaurants(restaurant_id)) {
            restaurantReviewDtos.add((RestaurantReviewDto) transfer(restaurantReview));
        }
        return restaurantReviewDtos;
    }

    @Override
    public void saveReview(RestaurantReview restaurantReview) {
        restaurantReviewRepository.save(restaurantReview);
    }

    @Override
    public RestaurantReview getRestaurantReview(int restaurantReviewId) {
        RestaurantReview restaurantReview = restaurantReviewRepository.findById(restaurantReviewId);
        return restaurantReview;
    }

    @Override
    public void deleteReview(RestaurantReview restaurantReview) {
        restaurantReviewRepository.delete(restaurantReview);
    }


}
