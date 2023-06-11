package com.project.backend.accounts.service;

import com.project.backend.accounts.repository.entity.Users;
import com.project.backend.accounts.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UsersRepository usersRepository;

    public Users create(String email, String password, String nickname, Date birth, String phoneNumber, String userAddress) {
        Users users = new Users();
        users.setEmail(email);
        users.setPassword(password);
        users.setNickname(nickname);
        users.setPhoneNumber(phoneNumber);
        users.setUserAddress(userAddress);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        users.setPassword(passwordEncoder.encode(password));
        this.usersRepository.save(users);
        return users;
    }

}
