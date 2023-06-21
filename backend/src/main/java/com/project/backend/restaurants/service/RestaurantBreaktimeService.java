package com.project.backend.restaurants.service;

import com.project.backend.general.interfaces.Transfer;
import com.project.backend.restaurants.dto.RestaurantBreaktimeDto;
import com.project.backend.restaurants.repository.entity.RestaurantBreaktime;

import java.util.List;

public interface RestaurantBreaktimeService extends Transfer {
    default RestaurantBreaktimeDto entityToDto(RestaurantBreaktime restaurantBreaktime){
        RestaurantBreaktimeDto dto = RestaurantBreaktimeDto.builder()
                .breakTime(restaurantBreaktime.getBreakTime())
                .build();
        return dto;
    }

    List<RestaurantBreaktimeDto> getAllBreaktime(int restaurantId);
}
