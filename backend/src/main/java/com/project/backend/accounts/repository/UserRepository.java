package com.project.backend.accounts.repository;

import com.project.backend.accounts.repository.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
