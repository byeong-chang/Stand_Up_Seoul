package com.project.backend.controller;

import com.project.backend.accounts.repository.entity.Users;
import com.project.backend.general.returnType.HotplaceType;
import com.project.backend.general.returnType.RestaurantType;
import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.service.CulturalEventService;
import com.project.backend.places.service.HotPlacesService;
import com.project.backend.restaurants.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
public class BoardController {

    RestaurantService restaurantService;
    CulturalEventService culturalEventService;
    HotPlacesService hotPlacesService;

    @Autowired
    public BoardController(RestaurantService restaurantService, CulturalEventService culturalEventService, HotPlacesService hotPlacesService) {
        this.restaurantService = restaurantService;
        this.culturalEventService = culturalEventService;
        this.hotPlacesService = hotPlacesService;
    }

    @GetMapping("/board")
    public String board(){
        System.out.println("연결 잘됨?");
        return "연결테스트";
    }

    //Restaurant Board 매핑
    @GetMapping(value = "restaurant/{id}")
    public RestaurantType getRestaurant(@PathVariable int id){
        return restaurantService.getBoard(id);
    }
    @PostMapping(value = "retaurant/{id}")
    public String postRestaurant(Model model, Users user , @PathVariable int id){
        return "redirect:/restaurant/{id}";
    }

    //CulturalEvent Board 매핑
    @GetMapping(value = "culturalEvent/{id}")
    public CulturalEventDto getCulturalEvent(@PathVariable int id){
        return culturalEventService.getBoard(id);
    }
    @PostMapping(value = "culturalEvent/{id}")
    public String postCulturalEvent(Model model, Users user ,@PathVariable int id){
        return "redirect:/culturalEvent/{id}";
    }

    //Hotplace Board 매핑
    @GetMapping(value = "hotplace/{id}")
    public HotplaceType getHotplace(@PathVariable int id){
        return hotPlacesService.getBoard(id);
    }
    @PostMapping(value = "hotplace/{id}")
    public String postHotplace(Model model, Users user ,@PathVariable int id){
        return "redirect:/hotplace/{id}";
    }

}





