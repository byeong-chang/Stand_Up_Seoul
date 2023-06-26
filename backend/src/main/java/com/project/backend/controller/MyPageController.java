package com.project.backend.controller;

import com.project.backend.accounts.dto.UsersDto;
import com.project.backend.accounts.repository.UsersRepository;
import com.project.backend.accounts.repository.entity.Users;
import com.project.backend.accounts.service.MyPageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class MyPageController {

    private final MyPageService myPageService;
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/mypage")
    public ResponseEntity<UsersDto> retrieve(@AuthenticationPrincipal String userId) {
        UsersDto entity = myPageService.retrieve(userId);
        return ResponseEntity.ok(entity);
    }

    @PostMapping("/mypage")
    public ResponseEntity<UsersDto> updateUser(@AuthenticationPrincipal String userId, @RequestBody UsersDto usersDto, Errors errors) {
        Users user = usersRepository.findById(Integer.parseInt(userId));

        if (user != null) {
            if (errors.hasErrors()) {
                UsersDto entity = myPageService.retrieve(userId);
                return ResponseEntity.badRequest().body(entity);
            }

            // 업데이트할 필드 값을 설정
            if (usersDto.getNickname() != null) {
                user.setNickname(usersDto.getNickname());
            }
            if (usersDto.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(usersDto.getPassword()));
            }
            if (usersDto.getUserAddress() != null) {
                user.setUserAddress(usersDto.getUserAddress());
            }
            if (usersDto.getPhoneNumber() != null) {
                user.setPhoneNumber(usersDto.getPhoneNumber());
            }

            usersRepository.save(user);
            myPageService.login(user);

            UsersDto updatedUsersDto = myPageService.convertToUsersDto(user);
            return ResponseEntity.ok(updatedUsersDto);

        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/mypage")
    public ResponseEntity<UsersDto> deleteUser(@AuthenticationPrincipal String userId) {
        Users user = usersRepository.findById(Integer.parseInt(userId));

        if (user != null) {
            String email = user.getEmail();
            myPageService.deleteUser(userId, email);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

}
