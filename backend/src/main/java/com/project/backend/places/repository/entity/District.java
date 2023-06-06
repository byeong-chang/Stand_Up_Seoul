package com.project.backend.places.repository.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "district")
public class District {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "district_nm")
    private String districtName;

    @JsonIgnore
    @ManyToMany(mappedBy = "assignedDistricts")
    private Set<Place> places = new HashSet<>();

}
