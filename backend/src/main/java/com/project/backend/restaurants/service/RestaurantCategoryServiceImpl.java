package com.project.backend.restaurants.service;

import com.project.backend.restaurants.repository.RestaurantCategoryRepository;
import com.project.backend.restaurants.repository.entity.RestaurantCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RestaurantCategoryServiceImpl implements RestaurantCategoryService{

    private final RestaurantCategoryRepository restaurantCategoryRepository;
    @Override
    public RestaurantCategory getCategories(String categoryName) {
        return restaurantCategoryRepository.findByCategory(categoryName);
    }
}
