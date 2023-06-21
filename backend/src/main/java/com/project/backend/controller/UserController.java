package com.project.backend.controller;

import com.project.backend.accounts.dto.ResponseDto;
import com.project.backend.accounts.dto.UsersDto;
import com.project.backend.accounts.repository.entity.Users;
import com.project.backend.accounts.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UsersDto usersDto){
        try{
            //요청을 이용해 저장할 사용자 만들기
            Users user = Users.builder()
                    .id(usersDto.getId())
                    .email(usersDto.getEmail())
                    .password(usersDto.getPassword())
                    .birth(LocalDate.parse(usersDto.getBirth()))
                    .phoneNumber(usersDto.getPhoneNumber())
                    .userAddress(usersDto.getUserAddress())
                    .reviewCount(usersDto.getReviewCount())
                    .nickname(usersDto.getNickname())
                    .createdDate(LocalDate.now())
                    .build();
            //서비스를 이용해 레포지터리에 사용자 저장
            Users registerUser = userService.create(user);
            UsersDto responseUserDTO = UsersDto.builder()
                    .id(registerUser.getId())
                    .email(registerUser.getEmail())
                    .password(registerUser.getPassword())
                    .birth(registerUser.getBirth().toString())
                    .phoneNumber(registerUser.getPhoneNumber())
                    .userAddress(registerUser.getUserAddress())
                    .reviewCount(registerUser.getReviewCount())
                    .nickname(registerUser.getNickname())
                    .createdDate(registerUser.getCreatedDate())
                    .build();
            return ResponseEntity.ok().body(responseUserDTO);
        }catch (Exception e){
            //사용자 정보는 항상 하나이므로 리스트로 만들어야 하는 ResponseDTO를 사용하지 않고 그냥 UserDTO 리턴
            ResponseDto responseDTO = ResponseDto.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody UsersDto usersDto){
        Users user = userService.getByCredentials(
                usersDto.getEmail(),
                usersDto.getPassword()
        );
        if(user != null){
            final UsersDto responseUserDTO = UsersDto.builder()
                    .email(user.getEmail())
                    .id(user.getId())
                    .build();
            return ResponseEntity.ok().body(responseUserDTO);
        }else {
            ResponseDto responseDto = ResponseDto.builder()
                    .error("Login failed.")
                    .build();
            return ResponseEntity
                    .badRequest()
                    .body(responseDto);
        }
    }

}
