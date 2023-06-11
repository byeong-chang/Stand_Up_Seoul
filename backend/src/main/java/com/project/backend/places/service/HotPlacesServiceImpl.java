package com.project.backend.places.service;

import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.repository.HotplacesRepository;
import com.project.backend.places.repository.entity.Hotplaces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HotPlacesServiceImpl implements HotPlacesService{
    HotplacesRepository hotplacesRepository;

    @Autowired
    public HotPlacesServiceImpl(HotplacesRepository hotplacesRepository) {
        this.hotplacesRepository = hotplacesRepository;
    }

    @Override
    public Object transfer(Object entity) {
        HotplacesDto dto =enttiyToDto((Hotplaces) entity);
        return dto;
    }
}
