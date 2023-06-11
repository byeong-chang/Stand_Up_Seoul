package com.project.backend.general.returnType;

import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.dto.PlaceDto;
import com.project.backend.population.dto.PopulationDto;
import com.project.backend.restaurants.dto.RestaurantDto;
import lombok.*;

import java.util.List;
@Data
public class LiveType {
    PopulationDto population;
    PlaceDto place;
    List<CulturalEventDto> culturalEventList;
    List<HotplacesDto> hotplacesList;
    List<RestaurantDto> restaurantList;
}
