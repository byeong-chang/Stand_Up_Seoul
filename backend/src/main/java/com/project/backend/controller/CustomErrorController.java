package com.project.backend.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/error")
public class CustomErrorController implements ErrorController {

    @RequestMapping
    public String handleError() {
        // 오류 처리 로직을 구현하거나 적절한 오류 페이지로 리다이렉션할 수 있습니다.
        return "error-page";
    }

    public String getErrorPath() {
        return "/error";
    }
}
