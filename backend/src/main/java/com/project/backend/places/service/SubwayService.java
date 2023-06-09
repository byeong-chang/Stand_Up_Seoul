package com.project.backend.places.service;

import com.project.backend.places.dto.PlaceDistrictDto;
import com.project.backend.places.dto.SubwayDto;
import com.project.backend.places.repository.entity.PlaceDistrict;
import com.project.backend.places.repository.entity.Subway;

public interface SubwayService {
    SubwayDto transfer(Subway entity);

    default SubwayDto enttiyToDto(Subway subway){
        SubwayDto dto = SubwayDto.builder()
                .id(subway.getId())
                .subwayName(subway.getSubwayName())
                .restaurantList(subway.getRestaurantList())
                .hotplacesList(subway.getHotplacesList())
                .build();
        return dto;
    }
}
