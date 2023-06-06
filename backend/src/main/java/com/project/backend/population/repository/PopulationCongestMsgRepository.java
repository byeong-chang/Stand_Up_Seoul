package com.project.backend.population.repository;

import com.project.backend.population.repository.entity.PopulationCongestMsg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PopulationCongestMsgRepository extends JpaRepository<PopulationCongestMsg,String> {
}
