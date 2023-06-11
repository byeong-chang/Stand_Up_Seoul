package com.project.backend.places.dto;

import com.project.backend.places.repository.entity.District;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceDistrictDto {
    private String place;
    private District district;
    private int id;
}
