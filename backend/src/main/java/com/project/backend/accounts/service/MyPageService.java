package com.project.backend.accounts.service;

import com.project.backend.accounts.dto.UsersDto;
import com.project.backend.accounts.repository.UsersRepository;
import com.project.backend.accounts.repository.entity.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class MyPageService {

    private final UsersRepository usersRepository;

    public List<UsersDto> retrieve(@AuthenticationPrincipal String userId) {
        List<UsersDto> userInfo = new ArrayList<>();
        // 사용자 정보 가져오기
        Users user = usersRepository.findById(Integer.parseInt(userId));
        if (user != null) {
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
            userInfo.add(usersDto);
        }
        return userInfo;
    }

    public void updateNickname(Users user, String nickname) {
        user.updateNickname(nickname);
        usersRepository.save(user);
    }
}
