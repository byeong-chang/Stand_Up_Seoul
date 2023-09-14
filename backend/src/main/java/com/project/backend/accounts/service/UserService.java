package com.project.backend.accounts.service;

import com.project.backend.accounts.repository.UsersRepository;
import com.project.backend.accounts.repository.entity.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserService {

    private final UsersRepository usersRepository;

    public Users getUser(int userId){
        return usersRepository.findById(userId);
    }
    public void saveUser(Users user){
        usersRepository.save(user);
    }

    public Boolean passwordCheck(String password, String passwordCheck){
        if (!password.equals(passwordCheck)){
            log.warn("비밀번호가 일치하지 않습니다.");
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
        return true;
    }
    public Users create(final Users user){
        if(user == null || user.getEmail() == null || user.getNickname() == null
                || user.getPassword() == null || user.getPhoneNumber() == null){
            throw new RuntimeException("빈 값이 존재합니다.");
        }
        final String email = user.getEmail();
        if(usersRepository.existsByEmail(email)){
            log.warn("Email already exists {}",email);
            throw new RuntimeException("이메일이 이미 존재합니다.");
        }
        if (!email.contains("@")) {
            // '@'가 없는 경우 처리할 로직
            throw new RuntimeException("이메일 입력양식은 xxx@xxx.com 입니다.");
        }
        final String nickname = user.getNickname();
        String nicknamePattern = "^[ㄱ-ㅎ가-힣a-zA-Z0-9-\\ ]{3,50}$";
        if(usersRepository.existsByNickname(nickname)){
            log.warn("Nickname already exists {}",nickname);
            throw new RuntimeException("닉네임이 이미 존재합니다.");
        }
        if(!Pattern.matches(nicknamePattern, nickname)){
            log.warn("Nickname Validation Error {}",nickname);
            throw new RuntimeException("잘못된 닉네임을 입력하셨습니다.");
        }
        final String phoneNumber = user.getPhoneNumber();
        String phonePattern = "^01([0-1])-?([0-9]{3,4})-?([0-9]{4})$";
        if(usersRepository.existsByPhoneNumber(phoneNumber)){
            log.warn("PhoneNumber already exists {}",phoneNumber);
            throw new RuntimeException("핸드폰 번호가 이미 존재합니다.");
        }
        if(!Pattern.matches(phonePattern, phoneNumber)){
            log.warn("PhoneNumber Validation Error {}",phoneNumber);
            throw new RuntimeException("휴대폰 입력양식은 010-xxxx-xxx입니다.");
        }
        final String address = user.getUserAddress();
        String addressPattern = "^[ㄱ-ㅎ가-힣a-zA-Z0-9-\\ ]{3,50}$";
        if(!Pattern.matches(addressPattern, address)){
            log.warn("Address Validation Error {}",address);
            throw new RuntimeException("잘못된 주소를 입력하셨습니다.");
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
