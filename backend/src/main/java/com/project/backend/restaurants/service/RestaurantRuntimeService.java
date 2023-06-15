package com.project.backend.restaurants.service;

import com.project.backend.general.interfaces.Transfer;
import com.project.backend.restaurants.dto.RestaurantRuntimeDto;
import com.project.backend.restaurants.repository.entity.RestaurantRuntime;

public interface RestaurantRuntimeService extends Transfer {
    default RestaurantRuntimeDto entityToDto(RestaurantRuntime restaurantRuntime){
        RestaurantRuntimeDto dto = RestaurantRuntimeDto.builder()
                .id(restaurantRuntime.getId())
                .runTime(restaurantRuntime.getRunTime())
                .build();
        return dto;
    }
}
