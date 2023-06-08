package com.project.backend.controller;

import com.project.backend.places.repository.entity.CulturalEvent;
import com.project.backend.places.repository.entity.Hotplaces;
import com.project.backend.population.repository.entity.Population;
import com.project.backend.restaurants.repository.entity.Restaurant;
import lombok.*;

import java.util.List;
@Data
public class LiveType {
    Population population;
    List<CulturalEvent> culturalEventList;
    List<Restaurant> restaurantList;
    List<Hotplaces> hotplacesList;
}
