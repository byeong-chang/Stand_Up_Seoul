package com.project.backend.restaurants.service;

import com.project.backend.restaurants.dto.RestaurantBreaktimeDto;
import com.project.backend.restaurants.repository.RestaurantBreaktimeRepository;
import com.project.backend.restaurants.repository.entity.RestaurantBreaktime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantBreaktimeServiceImpl implements RestaurantBreaktimeService {
    private final RestaurantBreaktimeRepository restaurantBreaktimeRepository;

    @Override
    public Object transfer(Object entity) {
        RestaurantBreaktimeDto dto = entityToDto((RestaurantBreaktime) entity);
        return dto;
    }

    public List<RestaurantBreaktimeDto> getAllBreaktime(int restaurant_id){
        List<RestaurantBreaktimeDto> restaurantBreaktimeDtos = new ArrayList<>();
        for (RestaurantBreaktime restaurantBreaktime : restaurantBreaktimeRepository.findRestaurant(restaurant_id)) {
            restaurantBreaktimeDtos.add((RestaurantBreaktimeDto) transfer(restaurantBreaktime));
        }
        return restaurantBreaktimeDtos;
    }
}
