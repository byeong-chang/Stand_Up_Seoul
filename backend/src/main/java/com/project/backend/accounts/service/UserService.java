package com.project.backend.accounts.service;

import com.project.backend.accounts.repository.UsersRepository;
import com.project.backend.accounts.repository.entity.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserService {

    private final UsersRepository usersRepository;
    public Users create(final Users user){
        if(user == null || user.getEmail() == null){
            throw new RuntimeException("Invalid argument");
        }
        final String email = user.getEmail();
        if(usersRepository.existsByEmail(email)){
            log.warn("Email already exists {}",email);
            throw new RuntimeException("Email already exists");
        }
        return usersRepository.save(user);
    }
    public Users getByCredentials(final String email, final String password){
        return usersRepository.findByEmailAndPassword(email,password);
    }

}
