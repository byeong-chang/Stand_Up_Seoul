package com.project.backend.places.service;

import com.project.backend.general.interfaces.Transfer;
import com.project.backend.places.dto.PlaceDto;
import com.project.backend.places.repository.entity.Place;

import java.util.List;

public interface PlaceService extends Transfer {

    default PlaceDto entityToDto(Place place){
        PlaceDto dto = PlaceDto.builder()
                .id(place.getId())
                .areaName(place.getAreaName())
                .placeCategory(place.getPlaceCategory().getCategory())
//                .placeDistricts(place.getPlaceDistricts())
//                .placeSubways(place.getPlaceSubways())
                .placeImage(place.getPlaceImage())
                .mapx(place.getMapx())
                .mapy(place.getMapy())
                .build();
        return dto;
    }

    List<Place> searchAll(String search);
}
