package com.project.backend.restaurants.service;

import com.project.backend.general.interfaces.Transfer;
import com.project.backend.restaurants.dto.RestaurantDto;
import com.project.backend.restaurants.repository.entity.Restaurant;

public interface RestaurantService extends Transfer {


    RestaurantDto getBoard(int restaurant_id);
    default RestaurantDto enttiyToDto(Restaurant restaurant){
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
                .marketAdmin(restaurant.getMarketAdmin())
                .likeCount(restaurant.getLikeCount())
                .dislikeCount(restaurant.getDislikeCount())
                .clickCount(restaurant.getClickCount())
                .reviewCount(restaurant.getReviewCount())
                .bookmarkCount(restaurant.getBookmarkCount())
                .starRating(restaurant.getStarRating())
                .build();
        return dto;
    }

}
