package com.project.backend.controller;

import com.project.backend.accounts.dto.HotplaceReviewDto;
import com.project.backend.accounts.dto.RestaurantReviewDto;
import com.project.backend.accounts.repository.entity.HotplaceLike;
import com.project.backend.accounts.repository.entity.HotplaceReview;
import com.project.backend.accounts.repository.entity.RestaurantLike;
import com.project.backend.accounts.repository.entity.RestaurantReview;
import com.project.backend.accounts.service.*;
import com.project.backend.general.returnType.HotplaceType;
import com.project.backend.general.returnType.RestaurantType;
import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.repository.entity.Hotplaces;
import com.project.backend.places.service.CulturalEventService;
import com.project.backend.places.service.HotPlacesService;
import com.project.backend.restaurants.repository.entity.Restaurant;
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
    public final RestaurantLikeService restaurantLikeService;
    public final HotplaceLikeService hotplaceLikeService;

    //Restaurant Board 매핑
    @GetMapping(value = "restaurant/{restaurantId}")
    public RestaurantType getRestaurant(@PathVariable int restaurantId ,@AuthenticationPrincipal String userId){
        Restaurant restaurant = restaurantService.getRestaurant(restaurantId);
        restaurant.setClickCount(restaurant.getClickCount()+1);
        restaurantService.saveRestaurant(restaurant);
        return restaurantService.getBoard(restaurantId, Integer.parseInt(userId));
    }
    @PostMapping("restaurant/insert/{restaurantId}")//넣을때
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
    @PostMapping("restaurant/modify/{restaurantBoardId}")//수정할때
    public String modifyRestaurantReview(@PathVariable int restaurantBoardId ,@RequestBody RestaurantReviewDto dto){
        RestaurantReview restaurantReview = restaurantReviewService.getRestaurantReview(restaurantBoardId);
        restaurantReview.setReviewImg(dto.getReviewImg());
        restaurantReview.setReview(dto.getReview());
        restaurantReviewService.saveReview(restaurantReview);
        return "redirect:/board/restaurant/"+restaurantReview.getRestaurantId().getId();
    }
    @GetMapping("restaurant/delete/{restaurantBoardId}")//삭제할때
    public String deleteRestaurantReview(@PathVariable int restaurantBoardId){
        RestaurantReview restaurantReview = restaurantReviewService.getRestaurantReview(restaurantBoardId);
        restaurantReviewService.deleteReview(restaurantReview);
        return "redirect:/board/restaurant/"+restaurantReview.getRestaurantId().getId();
}
    @GetMapping("restaurant/like/{restaurantId}")
    public String likeRestaurant(@PathVariable int restaurantId,@AuthenticationPrincipal String userId){
        RestaurantLike restaurantLike = RestaurantLike.builder()
                .restaurant(restaurantService.getRestaurant(restaurantId))
                .user(userService.getUser(Integer.parseInt(userId)))
                .build();
        restaurantLikeService.saveRestaurantLike(restaurantLike);
        return "redirect:/board/restaurant/"+restaurantId;
    }
    @GetMapping("restaurant/like/delete/{restaurantLikeId}")
    public String deleteRestaurantLike(@PathVariable int restaurantLikeId){
        RestaurantLike restaurantLike = restaurantLikeService.getRestaurantLike(restaurantLikeId);
        restaurantLikeService.deleteRestaurantLike(restaurantLike);
        return "redirect:/board/restaurant/"+ restaurantLike.getRestaurant().getId();
    }
    //Hotplace Board 매핑
    @GetMapping(value = "hotplace/{hotplaceId}")
    public HotplaceType getHotplace(@PathVariable int hotplaceId, @AuthenticationPrincipal String userId){
        Hotplaces hotplace = hotPlacesService.getHotplace(hotplaceId);
        hotplace.setClickCount(hotplace.getClickCount()+1);
        hotPlacesService.saveHotplace(hotplace);
        return hotPlacesService.getBoard(hotplaceId,Integer.parseInt(userId));
    }
    @PostMapping(value = "hotplace/insert/{hotplaceId}")
    public String postHotplace(@PathVariable int hotplaceId, @RequestBody HotplaceReviewDto dto, @AuthenticationPrincipal String userId){
        HotplaceReview hotplaceReview = HotplaceReview.builder()
                .review(dto.getReview())
                .reviewImage(dto.getReviewImg())
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
        hotplaceReview.setReviewImage(dto.getReviewImg());
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
    @GetMapping("hotplace/like/{hotplaceId}")
    public String likeHotplace(@PathVariable int hotplaceId,@AuthenticationPrincipal String userId){
        HotplaceLike hotplaceLike = HotplaceLike.builder()
                .hotplaces(hotPlacesService.getHotplace(hotplaceId))
                .user(userService.getUser(Integer.parseInt(userId)))
                .build();
        hotplaceLikeService.saveHotplaceLike(hotplaceLike);
        return "redirect:/board/hotplace/"+hotplaceId;
    }
    @GetMapping("hotplace/like/delete/{hotplaceLikeId}")
    public String deleteHotplaceLike(@PathVariable int hotplaceLikeId){
        HotplaceLike hotplaceLike = hotplaceLikeService.getHotplaceLike(hotplaceLikeId);
        hotplaceLikeService.deleteHotplaceLike(hotplaceLike);
        return "redirect:/board/hotplace/"+hotplaceLike.getHotplaces().getId();
    }
    //CulturalEvent Board 매핑
    @GetMapping(value = "culturalEvent/{culturalEventId}")
    public CulturalEventDto getCulturalEvent(@PathVariable int culturalEventId){
        return culturalEventService.getBoard(culturalEventId);
    }
}





