package com.project.backend.controller;

import com.project.backend.accounts.repository.entity.Users;
import com.project.backend.general.returnType.HotplaceType;
import com.project.backend.general.returnType.RestaurantType;
import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.service.CulturalEventService;
import com.project.backend.places.service.HotPlacesService;
import com.project.backend.restaurants.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    public final RestaurantService restaurantService;
    public final CulturalEventService culturalEventService;
    public final HotPlacesService hotPlacesService;

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





