package com.project.backend.places.service;

import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.repository.CulturalEventRepository;
import com.project.backend.places.repository.entity.CulturalEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CulturalEventServiceImpl implements CulturalEventService{

    CulturalEventRepository culturalEventRepository;

    @Autowired
    public CulturalEventServiceImpl(CulturalEventRepository culturalEventRepository) {
        this.culturalEventRepository = culturalEventRepository;
    }

    @Override
    public Object transfer(Object entity) {
        CulturalEventDto dto = entityToDto((CulturalEvent)entity);
        return dto;
    }

    @Override
    public CulturalEventDto getBoard(int cultural_event_id) {
        Optional<CulturalEvent> entity = culturalEventRepository.findById(cultural_event_id);
        CulturalEventDto dto = (CulturalEventDto) transfer(entity.get());
        return dto;
    }
}
