package com.project.backend.controller;

import com.project.backend.general.returnType.LiveType;
import com.project.backend.places.dto.PlaceDto;
import com.project.backend.population.dto.PopulationDto;
import com.project.backend.population.service.PopulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/live")
public class LiveContoller {
    private PopulationService populationService;

    @Autowired
    public LiveContoller(PopulationService populationService) {
        this.populationService = populationService;
    }

//   실시간 페이지 Get 매핑
    @GetMapping(value = "home")
    public Map<Integer, LiveType> getLive(){
        return populationService.getLive();
    }

//  실시간 상세 페이지 Get 매핑
    @GetMapping(value = "detail")
    public Map<String, PopulationDto> getDetail(){
        return populationService.getDetail();
    }

//  실시간 상세 - 상세 페이지 Get 매핑
    @GetMapping(value = "detail/{place_id}")
    public PlaceDto getPlaceDetail(@PathVariable int place_id){
        return populationService.getPlaceDetail(place_id);
    }
}
