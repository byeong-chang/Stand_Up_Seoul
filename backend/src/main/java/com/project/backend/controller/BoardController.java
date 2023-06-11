package com.project.backend.controller;


import com.project.backend.accounts.entity.User;
import com.project.backend.restaurants.dto.RestaurantDto;
import com.project.backend.restaurants.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
public class BoardController {

    RestaurantService restaurantService;

    @Autowired
    public BoardController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping(value = "{id}")
    public RestaurantDto getRestaurant(@PathVariable int id){
        return restaurantService.getBoard(id);
    }
    @PostMapping(value = "retaurant/{id}")
    public String postRestaurant(Model model, User user ,@PathVariable int id){
        return "redirect:/restaurant/{id}";
    }
}
