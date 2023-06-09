package com.project.backend.places.service;

import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.repository.CulturalEventRepository;
import com.project.backend.places.repository.entity.CulturalEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CulturalEventServiceImpl implements CulturalEventService{

    CulturalEventRepository culturalEventRepository;

    @Autowired
    public CulturalEventServiceImpl(CulturalEventRepository culturalEventRepository) {
        this.culturalEventRepository = culturalEventRepository;
    }

    @Override
    public CulturalEventDto transfer(CulturalEvent entity) {
        CulturalEventDto dto = enttiyToDto(entity);
        return dto;
    }
}
