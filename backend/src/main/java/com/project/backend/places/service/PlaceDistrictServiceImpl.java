package com.project.backend.places.service;

import com.project.backend.places.dto.PlaceDistrictDto;
import com.project.backend.places.repository.PlaceDistrictRepository;
import com.project.backend.places.repository.entity.PlaceDistrict;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceDistrictServiceImpl implements PlaceDistrictService{
   PlaceDistrictRepository placeDistrictRepository;

   @Autowired
    public PlaceDistrictServiceImpl(PlaceDistrictRepository placeDistrictRepository) {
        this.placeDistrictRepository = placeDistrictRepository;
    }

    @Override
    public PlaceDistrictDto transfer(PlaceDistrict entity) {
        PlaceDistrictDto dto = enttiyToDto(entity);
        return dto;
    }
}
