package com.project.backend.controller;

import com.project.backend.general.returnType.AllType;
import com.project.backend.general.returnType.SearchType;
import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.dto.PlaceDto;
import com.project.backend.places.service.CulturalEventService;
import com.project.backend.places.service.HotPlacesService;
import com.project.backend.places.service.PlaceService;
import com.project.backend.restaurants.dto.RestaurantDto;
import com.project.backend.restaurants.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("search")
public class SerarchController {

    private final PlaceService placeService;
    private final RestaurantService restaurantService;
    private final HotPlacesService hotPlacesService;
    private final CulturalEventService culturalEventService;

    @PostMapping("")
    public AllType searchResult(@RequestBody SearchType search){

        System.out.println(search);
        AllType allType = new AllType();

        List<PlaceDto> placeList = new ArrayList<>();
        List<RestaurantDto> restaurantList = new ArrayList<>();
        List<HotplacesDto> hotplaceList = new ArrayList<>();
        List<CulturalEventDto> culturalEventList = new ArrayList<>();
        placeService.searchAll(search.getSearch()).forEach(place -> placeList.add((PlaceDto) placeService.transfer(place)));
        hotPlacesService.searchAll(search.getSearch()).forEach(hotplaces -> hotplaceList.add((HotplacesDto) hotPlacesService.transfer(hotplaces)));
        restaurantService.searchAll(search.getSearch()).forEach(restaurant ->  restaurantList.add((RestaurantDto) restaurantService.transfer(restaurant)));
        culturalEventService.searchAll(search.getSearch()).forEach(culturalEvent ->culturalEventList.add((CulturalEventDto) culturalEventService.transfer(culturalEvent)));

        allType.setPlaceList(placeList);
        allType.setHotplaceList(hotplaceList);
        allType.setRestaurantList(restaurantList);
        allType.setCulturalEventList(culturalEventList);
        return allType;
    }


}
