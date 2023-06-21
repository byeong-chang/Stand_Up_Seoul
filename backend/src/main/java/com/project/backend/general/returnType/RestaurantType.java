package com.project.backend.general.returnType;

import com.project.backend.accounts.dto.RestaurantReviewDto;
import com.project.backend.restaurants.dto.RestaurantBreaktimeDto;
import com.project.backend.restaurants.dto.RestaurantDto;
import com.project.backend.restaurants.dto.RestaurantRuntimeDto;
import lombok.Data;

import java.util.List;

@Data
public class RestaurantType {
    RestaurantDto restaurantDto;
    List<RestaurantRuntimeDto> restaurantRuntimeDtos;
    List<RestaurantBreaktimeDto> restaurantBreaktimeDtos;
    List<RestaurantReviewDto> restaurantReviewDtos;
}