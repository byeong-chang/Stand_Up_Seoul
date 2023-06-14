package com.project.backend.controller;

//import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class BackendController {
    @GetMapping("")
    public String hello(){
        return "Success";
    }

//    @GetMapping("/main")
//    public String index() {
//        return "index";
//    }

//    @GetMapping("/")
//    public String root() {
//        return "redirect:/index";
//    }
}
