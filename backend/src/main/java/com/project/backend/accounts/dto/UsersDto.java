package com.project.backend.accounts.dto;

import com.project.backend.accounts.repository.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersDto {
    private int id;
    private String email;
    private String password;
    private LocalDateTime birth;
    private String phoneNumber;
    private String userAddress;
    private int reviewCount;
    private String nickname;
    private LocalDateTime createdDate;

    public String email() {
        return email;
    }

    public String password() {
        return password;
    }

    public LocalDateTime birth() {
        return birth;
    }

    public String nickName() {
        return nickname;
    }

    public static UsersDto of(String email, String password, LocalDateTime birth, String nickname) {
        return UsersDto.builder()
                .email(email)
                .password(password)
                .birth(birth)
                .nickname(nickname)
                .build();
    }

    public static <Optional> UsersDto from(UsersDto usersDto) {

        return usersDto.builder()
                .id(usersDto.getId())
                .email(usersDto.getEmail())
                .password(usersDto.getPassword())
                .birth(usersDto.getBirth())
                .phoneNumber(usersDto.getPhoneNumber())
                .userAddress(usersDto.getUserAddress())
                .reviewCount(usersDto.getReviewCount())
                .nickname(usersDto.getNickname())
                .createdDate(usersDto.getCreatedDate())
                .build();
    }
}
