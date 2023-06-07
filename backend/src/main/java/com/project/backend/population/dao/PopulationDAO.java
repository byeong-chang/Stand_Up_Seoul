package com.project.backend.population.dao;

import com.project.backend.population.repository.entity.Population;

public interface PopulationDAO {
    Population getPopulation(int id);
}
