package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.CulturalEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CulturalEventRepository extends JpaRepository<CulturalEvent,Integer> {

    List<CulturalEvent> findByTitleContaining(String search);
}
