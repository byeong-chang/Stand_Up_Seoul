package com.project.backend.accounts.repository;

import com.project.backend.accounts.entity.MarketAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RestaurantAdminRepository extends JpaRepository<MarketAdmin, String> {
}