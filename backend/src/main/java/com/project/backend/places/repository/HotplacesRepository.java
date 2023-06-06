package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.Hotplaces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotplacesRepository extends JpaRepository<Hotplaces,Integer> {
}
