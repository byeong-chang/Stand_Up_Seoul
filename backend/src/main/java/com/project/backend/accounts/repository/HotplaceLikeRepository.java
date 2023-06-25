package com.project.backend.accounts.repository;

import com.project.backend.accounts.repository.entity.HotplaceLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HotplaceLikeRepository extends JpaRepository<HotplaceLike,Integer> {

    @Query(value = "select * from hotplace_like where hotplace_id = :hotplaceId and users_id = :userId",nativeQuery = true)
    HotplaceLike findByUserIdAndHotplaceId(@Param("hotplaceId") int hotplaceId, @Param("userId") int userId);
}
