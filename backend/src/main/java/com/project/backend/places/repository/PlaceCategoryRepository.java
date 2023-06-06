package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.PlaceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceCategoryRepository extends JpaRepository<PlaceCategory, Integer> {
}
