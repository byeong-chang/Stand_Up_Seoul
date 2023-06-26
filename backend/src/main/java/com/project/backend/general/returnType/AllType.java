package com.project.backend.general.returnType;


import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.dto.PlaceDto;
import com.project.backend.restaurants.dto.RestaurantDto;
import lombok.Data;

import java.util.List;

@Data
public class AllType {

    List<PlaceDto> placeList;
    List<RestaurantDto> restaurantList;
    List<HotplacesDto> hotplaceList;
    List<CulturalEventDto> culturalEventList;
}
