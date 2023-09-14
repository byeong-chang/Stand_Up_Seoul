package com.project.backend.controller;

import com.project.backend.general.returnType.LiveType;
import com.project.backend.places.dto.LogilatiDto;
import com.project.backend.places.service.ContentTypeService;
import com.project.backend.population.dto.PopulationDto;
import com.project.backend.population.service.PopulationService;
import com.project.backend.restaurants.service.RestaurantCategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/live")
@RequiredArgsConstructor
@Slf4j
public class LiveContoller {
    private final PopulationService populationService;
    private final RestaurantCategoryService restaurantCategoryService;
    private final ContentTypeService contentTypeService;

//   실시간 페이지 Get 매핑
    @GetMapping(value = "home")
    public Map<Integer, LiveType> getLive(){
        return populationService.getLive();
    }
    @PostMapping("home/post")
    public Map<Integer, LiveType> postLive(@RequestBody LogilatiDto logilatiDto) {
        return populationService.getLocationLive(logilatiDto.getLongitude(), logilatiDto.getLatitude());
    }
//  실시간 상세 페이지 Get 매핑 - population 혼잡도 분류
    @GetMapping(value = "detail")
    public Map<String, List<PopulationDto>> getDetail(){
        return populationService.getDetail();
    }

//  실시간 상세 - 상세 페이지 Get 매핑
    @GetMapping(value = "detail/{placeId}")
    public Map<Integer, LiveType> getPlaceDetail(@PathVariable int placeId){
        return populationService.getPlaceDetail(placeId);
    }
    //live/detail/{placeId}페이지에 추가적으로 카테고리 분류로 restaurant, hotplace에 대한 데이터를 보여주고자 했으나 개발도중 취소됨.
//    @PostMapping(value = "detail/post/{placeId}")
//    public Map<Integer, LiveType> getPlaceDetailPost(@PathVariable int placeId , @RequestBody CategoryType categoryType){
//        List<Integer> restaurantCategories = new ArrayList<>();
//        List<Integer> hotplaceCategories = new ArrayList<>();
//
//        for(String rc:categoryType.getRestaurantCategory()){
//            restaurantCategories.add(restaurantCategoryService.getCategories(rc).getId());
//        }
//        for(String hc:categoryType.getHotpalceCateogry()){
//            hotplaceCategories.add(contentTypeService.getContentType(hc).getId());
//        }
//        return populationService.getPlaceCategoryDetail(placeId,restaurantCategories,hotplaceCategories);
//    }
}
