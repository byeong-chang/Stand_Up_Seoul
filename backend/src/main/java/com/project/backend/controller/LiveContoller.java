package com.project.backend.controller;

import com.project.backend.population.repository.entity.Population;
import com.project.backend.population.service.PopulationService;
import com.project.backend.general.returnType.LiveType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/population")
public class LiveContoller {
    private PopulationService populationService;

    @Autowired
    public LiveContoller(PopulationService populationService) {
        this.populationService = populationService;
    }

    @GetMapping(value = "{id}")
    public Population getPopulation(@PathVariable int id){
        return populationService.getPopulation(id);
    }

    @GetMapping(value = "home")
    public Map<Integer, LiveType> getLive(){
        return populationService.getLive();
    }
}
