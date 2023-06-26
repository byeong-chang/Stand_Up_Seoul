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
public class UserAddressFormValidator implements Validator {

    private final UsersRepository usersRepository;

    @Override
    public boolean supports(Class<?> clazz) {

        return UsersDto.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UsersDto usersDto = (UsersDto) target;
        if (usersDto.getUserAddress() == null) {
            errors.rejectValue("userAddress", "null-value", "주소를 입력해주세요.");
            return;
        }
        Users user = usersRepository.findByUserAddress(usersDto.getUserAddress());
        if (user != null) {
            errors.rejectValue("userAddress", "wrong-value", "중복된 주소입니다.");
        }
    }
}
