package com.project.backend.population.controller;

import com.project.backend.population.dto.PopulationDto;
import com.project.backend.population.service.PopulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/population")
public class PopulationContoller {
    private PopulationService populationService;

    @Autowired
    public PopulationContoller(PopulationService populationService) {
        this.populationService = populationService;
    }

    @GetMapping(value = "{id}")
    public PopulationDto getPopulation(@PathVariable int id){
        return populationService.getPopulation(id);
    }
}
