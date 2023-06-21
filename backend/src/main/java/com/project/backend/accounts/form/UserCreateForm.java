package com.project.backend.accounts.form;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UserCreateForm {

    @Email
    @NotEmpty(message = "이메일은 필수 항목!")
    private String email;

    @NotEmpty(message = "비밀번호는 필수 항목!")
    private String password1;

    @NotEmpty(message = "비밀번호 재확인은 필수 항목!")
    private String password2;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotEmpty(message = "생년월일은 필수 항목!")
    private String birth;

    @Pattern(regexp = "\\d{3}-\\d{3,4}-\\d{4}")
    @NotEmpty(message = "전화번호는 필수 항목!")
    private String phoneNumber;

    private String userAddress;

    @Size(min = 3, max = 15)
    @NotEmpty(message = "닉네임은 필수 항목!")
    private String nickname;
    
}
