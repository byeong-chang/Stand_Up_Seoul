package com.project.backend.population.service;

import com.project.backend.population.dto.PopulationDto;
import lombok.Data;
import org.springframework.stereotype.Service;

public interface PopulationService {
    public PopulationDto getPopulation(int id);
}
