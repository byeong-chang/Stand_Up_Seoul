package com.project.backend.places.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotplacesDto {
    private int id;
    private int contentId;
    private String contentType;
    private double mapX;
    private double mapY;
    private String title;
    private String subway;
    private String fileName;
    private String address;
    private LocalDateTime createdDate;
    private int bookmarkCount;
    private int clickCount;
    private int likeCount;
    private int reviewCount;
    private double starRating;
}

