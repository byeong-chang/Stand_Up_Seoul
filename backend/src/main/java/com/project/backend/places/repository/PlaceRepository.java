package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, String> {

    List<Place> findByAreaNameContaining(String search);
}
