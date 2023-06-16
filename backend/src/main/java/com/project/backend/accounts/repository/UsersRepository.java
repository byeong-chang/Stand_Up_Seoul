package com.project.backend.accounts.repository;

import com.project.backend.accounts.repository.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, String> {

    Optional<Users> findByEmail(String email);
    //List<Users> findByEmailLike(String email);
}
