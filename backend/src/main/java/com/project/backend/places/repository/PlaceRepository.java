package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PlaceRepository extends JpaRepository<Place, String> {
}
