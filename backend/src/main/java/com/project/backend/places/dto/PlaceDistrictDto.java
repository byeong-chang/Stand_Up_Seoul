package com.project.backend.places.dto;

import com.project.backend.places.repository.entity.District;
import com.project.backend.places.repository.entity.Place;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceDistrictDto {
    private Place place;
    private District district;
    private int id;
}
