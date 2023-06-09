package com.project.backend.population.repository;

import com.project.backend.population.repository.entity.Population;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PopulationRepository extends JpaRepository<Population,Integer> {
    List<Population> findTop48ByOrderByIdDesc();
}

