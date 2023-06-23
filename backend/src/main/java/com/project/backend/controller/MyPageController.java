package com.project.backend.controller;

import com.project.backend.accounts.dto.UsersDto;
import com.project.backend.accounts.service.MyPageService;
import com.project.backend.accounts.validator.NicknameFormValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class MyPageController {

    private final MyPageService myPageService;
    private final NicknameFormValidator nicknameFormValidator;

    @GetMapping("mypage")
    public ResponseEntity<List<UsersDto>> retrieve(@AuthenticationPrincipal String userId) {
        List<UsersDto> entity = myPageService.retrieve(userId);
        return ResponseEntity.ok(entity);
    }

    /*// Nickname
    @InitBinder("nicknameForm")
    public void nicknameFormInitBinder(WebDataBinder webDataBinder) {
        webDataBinder.addValidators(nicknameFormValidator);
    }*/

    /*@GetMapping("mypage")
    public String nicknameForm(Users user, Model model) {
        model.addAttribute(user);
        model.addAttribute(new NicknameForm(user.getNickname()));
        return "/user";
    }

    @PostMapping("mypage")
    public String updateNickname(Users user, @Valid NicknameForm nicknameForm, Errors errors, Model model, RedirectAttributes attributes) {
        if (errors.hasErrors()) {
            model.addAttribute(user);
            return "/user";
        }
        userService.updateNickname(user, nicknameForm.getNickname());
        attributes.addFlashAttribute("message", "닉네임을 수정하였습니다.");
        return "redirect:" + "/user";
    }*/


}
