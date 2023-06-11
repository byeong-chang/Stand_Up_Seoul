package com.project.backend.places.service;

import com.project.backend.places.dto.PlaceDto;
import com.project.backend.places.repository.PlaceRepository;
import com.project.backend.places.repository.entity.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceServiceImpl implements PlaceService{
    PlaceRepository placeRepository;

    @Autowired
    public PlaceServiceImpl(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    @Override
    public Object transfer(Object entity){
    PlaceDto dto = enttiyToDto((Place) entity);
        return dto;
    }
}
