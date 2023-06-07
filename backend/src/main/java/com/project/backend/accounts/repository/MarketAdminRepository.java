package com.project.backend.accounts.repository;

import com.project.backend.accounts.entity.MarketAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarketAdminRepository extends JpaRepository<MarketAdmin, String> {
}
