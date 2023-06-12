package com.project.backend.accounts.repository;

import com.project.backend.accounts.repository.entity.RestaurantAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RestaurantAdminRepository extends JpaRepository<RestaurantAdmin, String> {
}
