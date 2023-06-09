package com.project.backend.places.dto;

import com.project.backend.places.repository.entity.PlaceCategory;
import com.project.backend.places.repository.entity.PlaceDistrict;
import com.project.backend.places.repository.entity.PlaceSubway;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceDto {
    private int id;
    private String areaName;
    private PlaceCategory placeCategory;
    private List<PlaceDistrict> placeDistricts;
    private List<PlaceSubway> placeSubways;
}
