package com.project.backend.restaurants.service;

import com.project.backend.restaurants.repository.RestaurantRepository;
import com.project.backend.restaurants.repository.dto.RestaurantDto;
import com.project.backend.restaurants.repository.entity.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantServiceImpl(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public RestaurantDto transfer(Restaurant entity) {
        RestaurantDto dto = enttiyToDto(entity);
        return dto;
    }
}
