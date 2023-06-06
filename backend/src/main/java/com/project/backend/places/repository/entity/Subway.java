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
@Table(name = "subway")
public class Subway {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "subway_nm", length = 30)
    private String subwayName;

    @JsonIgnore
    @ManyToMany(mappedBy = "assignedSubways")
    private Set<Place> places = new HashSet<>();
}
