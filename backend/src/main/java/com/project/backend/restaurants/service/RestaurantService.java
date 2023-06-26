package com.project.backend.restaurants.service;

import com.project.backend.general.interfaces.Transfer;
import com.project.backend.general.returnType.RestaurantType;
import com.project.backend.restaurants.dto.RestaurantDto;
import com.project.backend.restaurants.repository.entity.Restaurant;

import java.util.List;

public interface RestaurantService extends Transfer {

    default RestaurantDto entityToDto(Restaurant restaurant){
        RestaurantDto dto = RestaurantDto.builder()
                .id(restaurant.getId())
                .title(restaurant.getTitle())
                .newAddress(restaurant.getNewAddress())
                .oldAddress(restaurant.getOldAddress())
                .callNumber(restaurant.getCallNumber())
                .restaurantCategory(restaurant.getCategory().getCategory())
                .parking(restaurant.getParking())
                .holiday(restaurant.getHoliday())
                .website(restaurant.getWebsite())
                .subway(restaurant.getSubway().getSubwayName())
                .fileName(restaurant.getFileName())
                .createdDate(restaurant.getCreatedDate())
                .likeCount(restaurant.getLikeCount())
                .clickCount(restaurant.getClickCount())
                .reviewCount(restaurant.getReviewCount())
                .starRating(restaurant.getStarRating())
                .mapx(restaurant.getMapx())
                .mapy(restaurant.getMapy())
                .build();
        return dto;
    }
    RestaurantType getBoard(int restaurantId, int userId);

    Restaurant getRestaurant(int restaurantId);

    void saveRestaurant(Restaurant restaurant);

    List<Restaurant> searchAll(String search);
}
