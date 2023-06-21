package com.project.backend.accounts.service;

import com.project.backend.accounts.repository.UsersRepository;
import com.project.backend.accounts.repository.entity.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserService {

    private final UsersRepository usersRepository;

    public void passwordCheck(String password, String passwordCheck){
        if (!password.equals(passwordCheck)){
            log.warn("Password is not same to passwordCheck");
            throw new RuntimeException("Incorrect password");
        }
    }
    public Users create(final Users user){
        if(user == null || user.getEmail() == null || user.getNickname() == null
                || user.getPassword() == null || user.getBirth() == null){
            throw new RuntimeException("Invalid argument");
        }
        final String email = user.getEmail();
        if(usersRepository.existsByEmail(email)){
            log.warn("Email already exists {}",email);
            throw new RuntimeException("Email already exists");
        }
        final String nickname = user.getNickname();
        if(usersRepository.existsByNickname(nickname)){
            log.warn("Nickname already exists {}",nickname);
            throw new RuntimeException("Nickname already exists");
        }
        final String phoneNumber = user.getPhoneNumber();
        if(usersRepository.existsByPhoneNumber(phoneNumber)){
            log.warn("PhoneNumber already exists {}",phoneNumber);
            throw new RuntimeException("PhoneNumber already exists");
        }
        return usersRepository.save(user);
    }
    public Users getByCredentials(final String email, final String password , final PasswordEncoder encoder) {
        final Users originalUser = usersRepository.findByEmail(email);

        //matches 메서드를 이용해 패스워드가 같은지 확인
        if (originalUser != null && encoder.matches(password, originalUser.getPassword())) {
            return originalUser;
        }
        return null;
    }
}
