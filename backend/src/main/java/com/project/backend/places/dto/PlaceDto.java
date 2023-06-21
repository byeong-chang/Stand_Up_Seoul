package com.project.backend.places.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceDto {
    private int id;
    private String areaName;
    private String placeCategory;
    private String placeImage;
    private double mapx;
    private double mapy;
}
