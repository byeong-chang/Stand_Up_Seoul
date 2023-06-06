package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.CulturalEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CulturalEventRepository extends JpaRepository<CulturalEvent,Integer> {
}
