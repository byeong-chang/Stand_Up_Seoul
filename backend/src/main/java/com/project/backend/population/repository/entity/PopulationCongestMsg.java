package com.project.backend.population.repository.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "population_congest_msg")
public class PopulationCongestMsg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "area_congest_lvl", length = 10)
    private String areaCongestLevel;

    @Column(name = "area_congest_msg", columnDefinition = "TEXT")
    private String areaCongestMessage;
}
