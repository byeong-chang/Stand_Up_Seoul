package com.project.backend.controller;

import com.project.backend.general.returnType.LiveType;
import com.project.backend.general.returnType.Location;
import com.project.backend.population.dto.PopulationDto;
import com.project.backend.population.service.PopulationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/live")
@RequiredArgsConstructor
public class LiveContoller {
    private final PopulationService populationService;

//   실시간 페이지 Get 매핑
    @GetMapping(value = "home")
    public Map<Integer, LiveType> getLive(){
        return populationService.getLive();
    }

    @RequestMapping(method = RequestMethod.POST, path = "home/post")
    public Map<Integer,LiveType> postLive(@RequestBody Location location){
        return populationService.getLocationLive(location.getLogitude(),location.getLatitude());
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
