package com.project.backend.places.dto;

import com.project.backend.places.repository.entity.PlaceCategory;
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
    private PlaceCategory placeCategory;
    private String placeImage;
    private double mapx;
    private double mapy;
}
