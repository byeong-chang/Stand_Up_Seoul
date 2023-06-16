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
public class HotplaceReviewDto {

    private String user;
    private String hotPlaces;
    private String review;
    private String reviewImage;
    private LocalDateTime createdDate;
}
