package com.project.backend.places.service;

import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.repository.HotplacesRepository;
import com.project.backend.places.repository.entity.Hotplaces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HotPlacesServiceImpl implements HotPlacesService{
    HotplacesRepository hotplacesRepository;

    @Autowired
    public HotPlacesServiceImpl(HotplacesRepository hotplacesRepository) {
        this.hotplacesRepository = hotplacesRepository;
    }

    @Override
    public Object transfer(Object entity) {
        HotplacesDto dto =entityToDto((Hotplaces) entity);
        return dto;
    }

    @Override
    public CulturalEventDto getBoard(int cultural_event_id) {
        Optional<Hotplaces> entity = hotplacesRepository.findById(cultural_event_id);
        CulturalEventDto dto = (CulturalEventDto) transfer(entity.get());
        return dto;
    }
}
