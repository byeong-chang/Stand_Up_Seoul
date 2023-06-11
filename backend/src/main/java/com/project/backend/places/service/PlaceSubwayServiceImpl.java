package com.project.backend.places.service;

import com.project.backend.places.dto.PlaceSubwayDto;
import com.project.backend.places.repository.entity.PlaceSubway;
import org.springframework.stereotype.Service;

@Service
public class PlaceSubwayServiceImpl implements PlaceSubwayService{
    @Override
    public Object transfer(Object entity) {
        PlaceSubwayDto dto = enttiyToDto((PlaceSubway) entity);
        return  dto;
    }

}
