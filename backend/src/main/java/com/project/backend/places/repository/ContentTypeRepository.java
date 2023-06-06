package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.ContentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentTypeRepository extends JpaRepository<ContentType,Integer> {
}
