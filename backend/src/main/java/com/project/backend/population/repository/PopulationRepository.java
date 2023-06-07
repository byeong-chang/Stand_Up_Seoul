package com.project.backend.population.repository;

import com.project.backend.population.repository.entity.Population;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PopulationRepository extends JpaRepository<Population,Integer> {
//    List<Population> findTop48ByIdOrderByDesc();
}
