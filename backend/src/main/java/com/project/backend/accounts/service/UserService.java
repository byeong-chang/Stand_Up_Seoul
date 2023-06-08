package com.project.backend.accounts.service;

import com.project.backend.accounts.entity.User;
import com.project.backend.accounts.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public User create(String email, String password, String nickname, Date birth, String phoneNumber, String userAddress) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setNickname(nickname);
        user.setBirth(birth);
        user.setPhoneNumber(phoneNumber);
        user.setUserAddress(userAddress);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(password));
        this.userRepository.save(user);
        return user;
    }

}
