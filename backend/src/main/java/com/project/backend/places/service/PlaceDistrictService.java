package com.project.backend.places.service;

import com.project.backend.places.dto.PlaceDistrictDto;
import com.project.backend.places.repository.entity.PlaceDistrict;

public interface PlaceDistrictService {
    PlaceDistrictDto transfer(PlaceDistrict entity);

    default PlaceDistrictDto enttiyToDto(PlaceDistrict placeDistrict){
        PlaceDistrictDto dto = PlaceDistrictDto.builder()
                .id(placeDistrict.getId())
                .district(placeDistrict.getDistrict())
                .place(placeDistrict.getPlace())
                .build();
        return dto;
    }
}
