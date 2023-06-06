package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.Subway;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubwayRepository extends JpaRepository<Subway,Integer> {
}
