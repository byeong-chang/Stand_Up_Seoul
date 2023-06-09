package com.project.backend.controller;

import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.population.dto.PopulationDto;
import com.project.backend.restaurants.repository.dto.RestaurantDto;
import lombok.*;

import java.util.List;
@Data
public class LiveType {
    PopulationDto population;
    List<CulturalEventDto> culturalEventList;
    List<HotplacesDto> hotplacesList;
    List<RestaurantDto> restaurantList;
}
