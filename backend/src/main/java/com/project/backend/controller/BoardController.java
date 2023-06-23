package com.project.backend.controller;

import com.project.backend.accounts.dto.HotplaceReviewDto;
import com.project.backend.accounts.dto.RestaurantReviewDto;
import com.project.backend.accounts.repository.entity.HotplaceReview;
import com.project.backend.accounts.repository.entity.RestaurantReview;
import com.project.backend.accounts.service.HotplaceReviewService;
import com.project.backend.accounts.service.RestaurantReviewService;
import com.project.backend.accounts.service.UserService;
import com.project.backend.general.returnType.HotplaceType;
import com.project.backend.general.returnType.RestaurantType;
import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.service.CulturalEventService;
import com.project.backend.places.service.HotPlacesService;
import com.project.backend.restaurants.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Slf4j
@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    public final RestaurantService restaurantService;
    public final CulturalEventService culturalEventService;
    public final HotPlacesService hotPlacesService;
    public final UserService userService;
    public final RestaurantReviewService restaurantReviewService;
    public final HotplaceReviewService hotplaceReviewService;

    //Restaurant Board 매핑
    @GetMapping(value = "restaurant/{id}")
    public RestaurantType getRestaurant(@PathVariable int id){
        return restaurantService.getBoard(id);
    }
    @PostMapping("restaurant/insert/{restaurantId}")
    public String insertRestaurantReview(@PathVariable int restaurantId ,@RequestBody RestaurantReviewDto dto, @AuthenticationPrincipal String userId){
        RestaurantReview restaurantReview = RestaurantReview.builder()
                .review(dto.getReview())
                .reviewImg(dto.getReviewImg())
                .createdDate(LocalDate.now())
                .userId(userService.getUser(Integer.parseInt(userId)))
                .restaurantId(restaurantService.getRestaurant(restaurantId))
                .build();
        restaurantReviewService.saveReview(restaurantReview);
        return "redirect:/board/restaurant/"+restaurantId;
    }
    @PostMapping("restaurant/modify/{restaurantBoardId}")
    public String modifyRestaurantReview(@PathVariable int restaurantBoardId ,@RequestBody RestaurantReviewDto dto){
        RestaurantReview restaurantReview = restaurantReviewService.getRestaurantReview(restaurantBoardId);
        restaurantReview.setReviewImg(dto.getReviewImg());
        restaurantReview.setReview(dto.getReview());
        restaurantReviewService.saveReview(restaurantReview);
        return "redirect:/board/restaurant/"+restaurantReview.getRestaurantId().getId();
    }
    @GetMapping("restaurant/delete/{restaurantBoardId}")
    public String deleteRestaurantReview(@PathVariable int restaurantBoardId){
        RestaurantReview restaurantReview = restaurantReviewService.getRestaurantReview(restaurantBoardId);
        restaurantReviewService.deleteReview(restaurantReview);
        return "redirect:/board/restaurant/"+restaurantReview.getRestaurantId().getId();
    }

    //Hotplace Board 매핑
    @GetMapping(value = "hotplace/{id}")
    public HotplaceType getHotplace(@PathVariable int id){
        return hotPlacesService.getBoard(id);
    }
    @PostMapping(value = "hotplace/insert/{hotplaceId}")
    public String postHotplace(@PathVariable int hotplaceId, @RequestBody HotplaceReviewDto dto, @AuthenticationPrincipal String userId){
        HotplaceReview hotplaceReview = HotplaceReview.builder()
                .review(dto.getReview())
                .reviewImage(dto.getReviewImage())
                .createdDate(LocalDate.now())
                .userId(userService.getUser(Integer.parseInt(userId)))
                .hotPlacesId(hotPlacesService.getHotplace(hotplaceId))
                .build();
        hotplaceReviewService.saveReview(hotplaceReview);
        return "redirect:/board/hotplace/"+hotplaceId;

    }
    @PostMapping("hotplace/modify/{hotplaceBoardId}")
    public String modifyHotplaceReview(@PathVariable int hotplaceBoardId ,@RequestBody HotplaceReviewDto dto){
        HotplaceReview hotplaceReview = hotplaceReviewService.getHotplaceReview(hotplaceBoardId);
        hotplaceReview.setReviewImage(dto.getReviewImage());
        hotplaceReview.setReview(dto.getReview());
        hotplaceReviewService.saveReview(hotplaceReview);
        return "redirect:/board/hotplace/"+hotplaceReview.getHotPlacesId().getId();
    }
    @GetMapping("hotplace/delete/{hotplaceBoardId}")
    public String deleteHotplaceReview(@PathVariable int hotplaceBoardId ){
        HotplaceReview hotplaceReview = hotplaceReviewService.getHotplaceReview(hotplaceBoardId);
        hotplaceReviewService.deleteReview(hotplaceReview);
        return "redirect:/board/hotplace"+hotplaceReview.getHotPlacesId().getId();
    }

    //CulturalEvent Board 매핑
    @GetMapping(value = "culturalEvent/{id}")
    public CulturalEventDto getCulturalEvent(@PathVariable int id){
        return culturalEventService.getBoard(id);
    }
}





