package com.project.backend.restaurants.service;

import com.project.backend.restaurants.repository.entity.RestaurantCategory;

public interface RestaurantCategoryService {

    RestaurantCategory getCategories (String categoryName);

}
