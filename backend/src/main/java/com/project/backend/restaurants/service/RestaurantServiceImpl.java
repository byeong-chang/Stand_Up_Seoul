package com.project.backend.restaurants.service;

import com.project.backend.accounts.service.RestaurantLikeService;
import com.project.backend.accounts.service.RestaurantReviewService;
import com.project.backend.accounts.service.UserService;
import com.project.backend.general.returnType.RestaurantType;
import com.project.backend.restaurants.dto.RestaurantDto;
import com.project.backend.restaurants.dto.RestaurantRuntimeDto;
import com.project.backend.restaurants.repository.RestaurantRepository;
import com.project.backend.restaurants.repository.entity.Restaurant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantRuntimeService restaurantRuntimeService;
    private final RestaurantBreaktimeService restaurantBreaktimeService;
    private final RestaurantReviewService restaurantReviewService;
    private final UserService userService;
    private final RestaurantLikeService restaurantLikeService;

    @Override
    public Object transfer(Object entity) {
        RestaurantDto dto = entityToDto((Restaurant) entity);
        return dto;
    }

    @Override
    public RestaurantType getBoard(int restaurantId, int userId){


        RestaurantType restaurantTypes = new RestaurantType();
        Restaurant entity = restaurantRepository.findById(restaurantId);
        Restaurant restaurant = entity;

        List<RestaurantRuntimeDto> restaurantRuntimeDtos = new ArrayList<>();
        restaurant.getRuntimeList().forEach(restaurantRuntime -> restaurantRuntimeDtos.add((RestaurantRuntimeDto) restaurantRuntimeService.transfer(restaurantRuntime)));

        restaurantTypes.setRestaurantDto((RestaurantDto) transfer(restaurant));
        restaurantTypes.setRestaurantRuntimeDtos(restaurantRuntimeDtos);
        restaurantTypes.setRestaurantBreaktimeDtos(restaurantBreaktimeService.getAllBreaktime(restaurantId));
        restaurantTypes.setRestaurantLikeDto(restaurantLikeService.getByUserIdAndRestaurantId(restaurantId,userId));
        restaurantTypes.setRestaurantReviewDtos(restaurantReviewService.getRestaurantReviews(restaurantId));

        return restaurantTypes;
    }

    @Override
    public Restaurant getRestaurant(int restaurantId) {
        return restaurantRepository.findById(restaurantId);
    }

}
