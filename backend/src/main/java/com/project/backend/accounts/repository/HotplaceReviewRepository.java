package com.project.backend.accounts.repository;

import com.project.backend.accounts.repository.entity.HotplaceReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HotplaceReviewRepository extends JpaRepository<HotplaceReview, Integer> {
    @Query(value = "select * from hotplaces_review where hotplaces_id = :id", nativeQuery = true)
    List<HotplaceReview> findHotplaces(@Param("id") int id);
}
