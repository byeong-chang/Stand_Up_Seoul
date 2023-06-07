package com.project.backend.population.service;

import com.project.backend.population.dto.PopulationDto;
import com.project.backend.population.handler.PopulationHandler;
import com.project.backend.population.repository.entity.Population;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PopulationServiceImpl implements PopulationService{

    PopulationHandler populationHandler;

    @Autowired
    public PopulationServiceImpl(PopulationHandler populationHandler) {
        this.populationHandler = populationHandler;
    }
    @Override
    public PopulationDto getPopulation(int id) {
        Population population = populationHandler.getPopulationEntity(id);

        PopulationDto populationDto = new PopulationDto(population.getId(),population.getPlace(),population.getAreaCongest(),population.getAreaPopulationMin(),
                population.getAreaPopulationMax(), population.getMalePopulationRate(),population.getFemalePopulationRate(),population.getPopulationRate0(),
                population.getPopulationRate10(),population.getPopulationRate20(),population.getPopulationRate30(),population.getPopulationRate40(),population.getPopulationRate50(),population.getPopulationRate60(),
                population.getPopulationRate70(),population.getResidentPopulationRate(),population.getNonResidentPopulationRate(),population.getPopulationTime(),population.getCreatedDate());
        return populationDto;
    }
}
