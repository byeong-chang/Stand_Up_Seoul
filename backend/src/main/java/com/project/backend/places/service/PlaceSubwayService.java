package com.project.backend.places.service;


import com.project.backend.general.interfaces.Transfer;
import com.project.backend.places.dto.PlaceSubwayDto;
import com.project.backend.places.repository.entity.PlaceSubway;

public interface PlaceSubwayService extends Transfer {
    default PlaceSubwayDto enttiyToDto(PlaceSubway placeSubway){
        PlaceSubwayDto dto = PlaceSubwayDto.builder()
                .place(placeSubway.getPlace().getAreaName())
                .subway(placeSubway.getSubway())
                .id(placeSubway.getId())
                .build();
        return dto;
    }

}
