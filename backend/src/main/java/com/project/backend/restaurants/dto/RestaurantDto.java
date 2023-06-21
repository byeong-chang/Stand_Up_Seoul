package com.project.backend.restaurants.dto;

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
    private String restaurantCategory;
    private String parking;
    private String holiday;
    private String website;
    private String subway;
    private String fileName;
    private LocalDateTime createdDate;
    private int likeCount;
    private int clickCount;
    private int reviewCount;
    private Double starRating;
    private Double mapx;
    private Double mapy;

}
