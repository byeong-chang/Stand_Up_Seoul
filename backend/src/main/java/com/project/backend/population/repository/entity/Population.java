package com.project.backend.population.repository.entity;

import com.project.backend.places.repository.entity.Place;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
@Table(name = "population")
public class Population {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @ManyToOne
    @JoinColumn(name = "area_congest_id")
    private PopulationCongestMsg areaCongest;

    @Column(name = "area_ppltn_min")
    private int areaPopulationMin;

    @Column(name = "area_ppltn_max")
    private int areaPopulationMax;

    @Column(name = "male_ppltn_rate")
    private double malePopulationRate;

    @Column(name = "female_ppltn_rate")
    private double femalePopulationRate;

    @Column(name = "ppltn_rate_0")
    private double populationRate0;

    @Column(name = "ppltn_rate_10")
    private double populationRate10;

    @Column(name = "ppltn_rate_20")
    private double populationRate20;

    @Column(name = "ppltn_rate_30")
    private double populationRate30;

    @Column(name = "ppltn_rate_40")
    private double populationRate40;

    @Column(name = "ppltn_rate_50")
    private double populationRate50;

    @Column(name = "ppltn_rate_60")
    private double populationRate60;

    @Column(name = "ppltn_rate_70")
    private double populationRate70;

    @Column(name = "resnt_ppltn_rate")
    private double residentPopulationRate;

    @Column(name = "non_resnt_ppltn_rate")
    private double nonResidentPopulationRate;

    @Column(name = "ppltn_time")
    private LocalDateTime populationTime;

    @Column(name = "created_date")
    private LocalDateTime createdDate;
}
