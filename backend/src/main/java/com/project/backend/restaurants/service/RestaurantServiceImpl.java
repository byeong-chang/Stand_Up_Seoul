package com.project.backend.restaurants.service;

import com.project.backend.restaurants.dto.RestaurantDto;
import com.project.backend.restaurants.repository.RestaurantRepository;
import com.project.backend.restaurants.repository.entity.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantServiceImpl(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public Object transfer(Object entity) {

        RestaurantDto dto = entityToDto((Restaurant) entity);
        return dto;
    }

    @Override
    public RestaurantDto getBoard(int restaurant_id){
        Optional<Restaurant> entity = restaurantRepository.findById(restaurant_id);
        RestaurantDto dto = (RestaurantDto) transfer(entity.get());
        return dto;
    }
}
