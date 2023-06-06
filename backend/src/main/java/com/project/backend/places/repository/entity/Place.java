package com.project.backend.places.repository.entity;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "place")
public class Place {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "area_nm",length = 30)
    private String areaName;

    @ManyToOne(targetEntity = PlaceCategory.class)
    @JoinColumn(name="category_id")
    private PlaceCategory placeCategory;

    @ManyToMany
    @JoinTable(name = "place_district",
            joinColumns = @JoinColumn(name = "place_id"),
            inverseJoinColumns = @JoinColumn(name = "district_id")
    )
    private Set<District> assignedDistricts = new HashSet<>();


    @ManyToMany
    @JoinTable(name = "place_subway",
            joinColumns = @JoinColumn(name = "place_id"),
            inverseJoinColumns = @JoinColumn(name = "subway_id")
    )
    private Set<Subway> assignedSubways = new HashSet<>();
}
