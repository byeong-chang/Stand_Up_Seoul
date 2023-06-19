package com.project.backend.controller;

import com.project.backend.accounts.form.UserCreateForm;
import com.project.backend.accounts.service.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody UserCreateForm userCreateForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // 유효성 검사 오류가 있는 경우
            return ResponseEntity.badRequest().body("유효성 검사 오류");
        }

        if (!userCreateForm.getPassword1().equals(userCreateForm.getPassword2())) {
            // 비밀번호가 일치하지 않는 경우
            return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
        }

        try {
            userService.create(userCreateForm.getEmail(), userCreateForm.getPassword1(), LocalDateTime.parse(userCreateForm.getBirth()), userCreateForm.getPhoneNumber(), userCreateForm.getNickname());
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            // 이미 등록된 사용자인 경우
            return ResponseEntity.badRequest().body("이미 등록된 사용자입니다.");
        } catch (Exception e) {
            e.printStackTrace();
            // 기타 예외 발생 시
            return ResponseEntity.badRequest().body("회원가입에 실패했습니다.");
        }

        return ResponseEntity.ok("회원가입이 성공적으로 처리되었습니다.");
    }

}
