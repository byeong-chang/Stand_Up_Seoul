package com.project.backend.places.service;

import com.project.backend.places.dto.SubwayDto;
import com.project.backend.places.repository.SubwayRepository;
import com.project.backend.places.repository.entity.Subway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubwayServiceImpl implements SubwayService{
    SubwayRepository subwayRepository;
    @Autowired
    public SubwayServiceImpl(SubwayRepository subwayRepository) {
        this.subwayRepository = subwayRepository;
    }

    @Override
    public SubwayDto transfer(Subway entity) {
        SubwayDto dto = enttiyToDto(entity);
        return  dto;
    }
}
