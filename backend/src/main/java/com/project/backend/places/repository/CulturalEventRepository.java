package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.CulturalEvent;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CulturalEventRepository extends JpaRepository<CulturalEvent,Integer> {
}
