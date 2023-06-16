package com.project.backend.accounts.service;

import com.project.backend.accounts.repository.entity.Users;
import com.project.backend.accounts.repository.UsersRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Users create(String email, String password, LocalDateTime birth, String phoneNumber, String userAddress) {
        Users users = new Users();
        users.setEmail(email);
        users.setPassword(passwordEncoder.encode(password));
        users.setBirth(birth);
        users.setPhoneNumber(phoneNumber);
        users.setUserAddress(userAddress);
        this.usersRepository.save(users);
        return users;
    }

}
