package com.project.backend.restaurants.repository.dto;

import com.project.backend.accounts.entity.MarketAdmin;
import com.project.backend.places.repository.entity.Subway;
import com.project.backend.restaurants.repository.entity.RestaurantCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantDto {
    private int id;
    private String title;
    private String newAddress;
    private String oldAddress;
    private String callNumber;
    private RestaurantCategory category;
    private String parking;
    private String holiday;
    private String website;
//    private Subway subway;
    private String fileName;
    private LocalDateTime createdDate;
    private MarketAdmin marketAdmin;
    private int likeCount;
    private int dislikeCount;
    private int clickCount;
    private int reviewCount;
    private int bookmarkCount;
    private int starRating;

}
