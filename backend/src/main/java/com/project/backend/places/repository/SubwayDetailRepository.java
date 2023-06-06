package com.project.backend.places.repository;

import com.project.backend.places.repository.entity.SubwayDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubwayDetailRepository extends JpaRepository<SubwayDetail,Integer> {
}
