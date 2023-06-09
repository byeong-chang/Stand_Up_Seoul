package com.project.backend.places.dto;

import com.project.backend.places.repository.entity.Hotplaces;
import com.project.backend.places.repository.entity.PlaceSubway;
import com.project.backend.restaurants.repository.entity.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubwayDto {
    private int id;
    private String subwayName;
    private List<Restaurant> restaurantList;
    private List<Hotplaces> hotplacesList;
}
