package com.project.backend.restaurants.repository.entity;

import com.project.backend.places.repository.entity.Place;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "restaurant_runtime")
public class RestaurantRuntime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "run_time", length = 255)
    private String runTime;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
}
