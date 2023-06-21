package com.project.backend.restaurants.service;

import com.project.backend.restaurants.dto.RestaurantRuntimeDto;
import com.project.backend.restaurants.repository.RestaurantRuntimeRepository;
import com.project.backend.restaurants.repository.entity.RestaurantRuntime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantRuntimeServiceImpl implements RestaurantRuntimeService{

    private final RestaurantRuntimeRepository restaurantRuntimeRepository;
    @Autowired
    public RestaurantRuntimeServiceImpl(RestaurantRuntimeRepository restaurantRuntimeRepository) {
        this.restaurantRuntimeRepository = restaurantRuntimeRepository;
    }

    @Override
    public Object transfer(Object entity) {
        RestaurantRuntimeDto dto = entityToDto((RestaurantRuntime) entity);
        return dto;
    }
}
