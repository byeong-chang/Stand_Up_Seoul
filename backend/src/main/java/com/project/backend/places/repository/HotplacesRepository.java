package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.Hotplaces;
import org.springframework.data.jpa.repository.JpaRepository;
public interface HotplacesRepository extends JpaRepository<Hotplaces,Integer> {
}
