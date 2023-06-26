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
public class PhoneNumberFormValidator implements Validator {

    private final UsersRepository usersRepository;

    @Override
    public boolean supports(Class<?> clazz) {

        return UsersDto.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UsersDto usersDto = (UsersDto) target;
        if (usersDto.getPhoneNumber() == null) {
            errors.rejectValue("phoneNumber", "null.value", "전화번호를 입력해주세요.");
            return;
        }
        Users user = usersRepository.findByPhoneNumber(usersDto.getPhoneNumber());
        if (user != null) {
            errors.rejectValue("phoneNumber", "wrong.value", "중복된 전화번호입니다.");
        }
    }
}
