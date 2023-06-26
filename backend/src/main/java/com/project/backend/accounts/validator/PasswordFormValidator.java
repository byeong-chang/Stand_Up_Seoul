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
public class PasswordFormValidator implements Validator {

    private final UsersRepository usersRepository;

    @Override
    public boolean supports(Class<?> clazz) {

        return UsersDto.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UsersDto usersDto = (UsersDto) target;
        if (usersDto.getPassword() == null) {
            errors.rejectValue("password", "null.value", "비밀번호를 입력해주세요.");
            return;
        }
        Users user = usersRepository.findByPassword(usersDto.getPassword());
        if (user != null) {
            errors.rejectValue("password", "wrong.value", "잘못된 비밀번호입니다.");
        }
    }
}

