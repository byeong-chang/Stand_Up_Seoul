package com.project.backend.places.service;

import com.project.backend.general.interfaces.Transfer;
import com.project.backend.places.dto.PlaceDistrictDto;
import com.project.backend.places.repository.entity.PlaceDistrict;

public interface PlaceDistrictService extends Transfer {

    default PlaceDistrictDto enttiyToDto(PlaceDistrict placeDistrict){
        PlaceDistrictDto dto = PlaceDistrictDto.builder()
                .id(placeDistrict.getId())
                .district(placeDistrict.getDistrict())
                .place(placeDistrict.getPlace().getAreaName())
                .build();
        return dto;
    }
}
