package com.project.backend.accounts.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantReviewDto {

    private String user;
    private String restaurant;
    private String review;
    private String reviewImg;
    private LocalDateTime createdDate;
}
