package com.project.backend.accounts.validator;

import com.project.backend.accounts.dto.UsersDto;
import com.project.backend.accounts.repository.UsersRepository;
import com.project.backend.accounts.repository.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
@RequiredArgsConstructor
public class NicknameFormValidator implements Validator {

    // 사용자 정보를 조회하기 위해 UsersRepository 사용
    private final UsersRepository usersRepository;

    @Override
    public boolean supports(Class<?> clazz) {

        return UsersDto.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UsersDto usersDto = (UsersDto) target;
        if (usersDto.getNickname() == null) {
            errors.rejectValue("nickname", "null.value", "닉네임을 입력해주세요.");
            return;
        }
        Users user = usersRepository.findByNickname(usersDto.getNickname());
        if (user != null) {
            errors.rejectValue("nickname", "wrong.value", "이미 사용중인 닉네임입니다.");
        }
    }
}
