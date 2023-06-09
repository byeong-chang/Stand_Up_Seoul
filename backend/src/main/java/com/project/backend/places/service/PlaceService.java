package com.project.backend.places.service;

import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.dto.PlaceDto;
import com.project.backend.places.repository.entity.Hotplaces;
import com.project.backend.places.repository.entity.Place;

public interface PlaceService {
    PlaceDto transfer(Place entity);

    default PlaceDto enttiyToDto(Place place){
        PlaceDto dto = PlaceDto.builder()
                .id(place.getId())
                .areaName(place.getAreaName())
                .placeCategory(place.getPlaceCategory())
                .placeDistricts(place.getPlaceDistricts())
                .placeSubways(place.getPlaceSubways())
                .build();
        return dto;
    }
}
