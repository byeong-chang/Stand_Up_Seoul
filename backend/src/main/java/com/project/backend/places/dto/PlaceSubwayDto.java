package com.project.backend.places.dto;

import com.project.backend.places.repository.entity.Subway;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceSubwayDto {
    private int id;
    private String place;
    private Subway subway;
}
