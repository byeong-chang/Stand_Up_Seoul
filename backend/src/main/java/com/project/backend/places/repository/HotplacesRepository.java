package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.Hotplaces;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotplacesRepository extends JpaRepository<Hotplaces,Integer> {

    List<Hotplaces> findByTitleContaining(String search);
}
