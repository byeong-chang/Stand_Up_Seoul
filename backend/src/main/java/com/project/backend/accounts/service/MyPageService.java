package com.project.backend.accounts.service;

import com.project.backend.accounts.dto.UsersDto;
import com.project.backend.accounts.repository.UsersRepository;
import com.project.backend.accounts.repository.entity.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Slf4j
public class MyPageService {

    private final UsersRepository usersRepository;
    public void login(Users user) {}

    public void logout(String email) {}

    public UsersDto retrieve(String userId) {
        UsersDto usersDto = new UsersDto();
        // 사용자 정보 가져오기
        Users user = usersRepository.findById(Integer.parseInt(userId));
        if (user != null) {
            usersDto.setId(user.getId());
            usersDto.setEmail(user.getEmail());
            usersDto.setPassword(user.getPassword());
            usersDto.setBirth(String.valueOf(user.getBirth()));
            usersDto.setPhoneNumber(user.getPhoneNumber());
            usersDto.setUserAddress(user.getUserAddress());
            usersDto.setNickname(user.getNickname());
            usersDto.setCreatedDate(user.getCreatedDate());
            usersDto.setSex(user.getSex());
        }
        return usersDto;
    }

    @Transactional
    public void deleteUser(String userId, String email) {
        Users user = usersRepository.findById(Integer.parseInt(userId));
        if (user != null) {
            logout(email);
            usersRepository.delete(user);
        }
    }

    public UsersDto convertToUsersDto(Users user) {
        if (user == null) {
            return null;
        }
        UsersDto usersDto = new UsersDto();
        usersDto.setId(user.getId());
        usersDto.setEmail(user.getEmail());
        usersDto.setPassword(user.getPassword());
        usersDto.setBirth(String.valueOf(user.getBirth()));
        usersDto.setPhoneNumber(user.getPhoneNumber());
        usersDto.setUserAddress(user.getUserAddress());
        usersDto.setNickname(user.getNickname());
        usersDto.setCreatedDate(user.getCreatedDate());
        usersDto.setSex(user.getSex());
        return usersDto;
    }
}
