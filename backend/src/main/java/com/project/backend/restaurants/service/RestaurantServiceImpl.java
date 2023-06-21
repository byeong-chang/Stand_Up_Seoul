package com.project.backend.restaurants.service;

import com.project.backend.accounts.service.RestaurantReviewService;
import com.project.backend.general.returnType.RestaurantType;
import com.project.backend.restaurants.dto.RestaurantDto;
import com.project.backend.restaurants.dto.RestaurantRuntimeDto;
import com.project.backend.restaurants.repository.RestaurantRepository;
import com.project.backend.restaurants.repository.entity.Restaurant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantRuntimeService restaurantRuntimeService;
    private final RestaurantBreaktimeService restaurantBreaktimeService;
    private final RestaurantReviewService restaurantReviewService;

    @Override
    public Object transfer(Object entity) {
        RestaurantDto dto = entityToDto((Restaurant) entity);
        return dto;
    }

    @Override
    public RestaurantType getBoard(int restaurant_id){
        RestaurantType restaurantTypes = new RestaurantType();
        Optional<Restaurant> entity = restaurantRepository.findById(restaurant_id);
        Restaurant restaurant = entity.get();

        List<RestaurantRuntimeDto> restaurantRuntimeDtos = new ArrayList<>();
        restaurant.getRuntimeList().forEach(restaurantRuntime -> restaurantRuntimeDtos.add((RestaurantRuntimeDto) restaurantRuntimeService.transfer(restaurantRuntime)));

        restaurantTypes.setRestaurantDto((RestaurantDto) transfer(restaurant));
        restaurantTypes.setRestaurantRuntimeDtos(restaurantRuntimeDtos);
        restaurantTypes.setRestaurantBreaktimeDtos(restaurantBreaktimeService.getAllBreaktime(restaurant_id));
        restaurantTypes.setRestaurantReviewDtos(restaurantReviewService.getRestaurantReview(restaurant_id));

        return restaurantTypes;
    }
}
