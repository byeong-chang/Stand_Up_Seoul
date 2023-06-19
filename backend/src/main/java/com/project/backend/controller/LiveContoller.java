package com.project.backend.controller;

import com.project.backend.general.returnType.LiveType;
import com.project.backend.population.dto.PopulationDto;
import com.project.backend.population.service.PopulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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

    @ResponseBody
    @PostMapping(value = "home")
    public double postLive(@RequestBody HashMap<String,Double> location){
        return location.get("Latitute") + location.get("Longitude");
    }

//  실시간 상세 페이지 Get 매핑 - population 혼잡도 분류
    @GetMapping(value = "detail")
    public Map<String, List<PopulationDto>> getDetail(){
        return populationService.getDetail();
    }

//  실시간 상세 - 상세 페이지 Get 매핑
    @GetMapping(value = "detail/{place_id}")
    public Map<Integer, LiveType> getPlaceDetail(@PathVariable int place_id){
        return populationService.getPlaceDetail(place_id);
    }
}
