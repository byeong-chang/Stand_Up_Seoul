package com.project.backend.accounts.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersDto {
    private int id;
    private String email;
    private String password;
    private String birth;
    private String phoneNumber;
    private String userAddress;
    private int reviewCount;
    private String nickname;
    private LocalDate createdDate;
}
