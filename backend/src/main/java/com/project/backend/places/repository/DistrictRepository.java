package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
public interface DistrictRepository extends JpaRepository<District, Integer> {
}
