package com.project.backend.population.handler;

import com.project.backend.population.dao.PopulationDAO;
import com.project.backend.population.dto.PopulationDto;
import com.project.backend.population.repository.entity.Population;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Access;
import javax.transaction.Transactional;

@Service
@Transactional
public class PopulationHandlerImpl implements PopulationHandler{
    PopulationDAO populationDAO;

    @Autowired
    public PopulationHandlerImpl(PopulationDAO populationDAO) {
        this.populationDAO = populationDAO;
    }


    @Override
    public Population getPopulationEntity(int id) {
        return populationDAO.getPopulation(id);
    }
}
