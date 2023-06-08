package com.project.backend.population.service;

import com.project.backend.controller.LiveType;
import com.project.backend.population.repository.entity.Population;

import java.util.Map;

public interface PopulationService {
    Population getPopulation(int id);
    Map<Integer,LiveType> getLive();
}
