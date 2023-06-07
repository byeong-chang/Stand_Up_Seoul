package com.project.backend.population.dao;

import com.project.backend.population.repository.PopulationRepository;
import com.project.backend.population.repository.entity.Population;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PopulationDAOImpl implements PopulationDAO{

    PopulationRepository populationRepository;

    @Autowired
    public PopulationDAOImpl(PopulationRepository populationRepository) {
        this.populationRepository = populationRepository;
    }
    @Override
    public Population getPopulation(int id) {
        Population population = populationRepository.getById(id);
        return population;
    }
}
