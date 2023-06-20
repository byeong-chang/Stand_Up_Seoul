package com.project.backend.population.dto;

import com.project.backend.population.repository.entity.PopulationCongestMsg;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PopulationDto {
    private int id;
    private String place;
    private PopulationCongestMsg areaCongest;
    private int areaPopulationMin;
    private int areaPopulationMax;
    private double malePopulationRate;
    private double femalePopulationRate;
    private double populationRate0;
    private double populationRate10;
    private double populationRate20;
    private double populationRate30;
    private double populationRate40;
    private double populationRate50;
    private double populationRate60;
    private double populationRate70;
    private double residentPopulationRate;
    private double nonResidentPopulationRate;
    private LocalDateTime populationTime;
    private LocalDateTime createdDate;

    // 쿼리문으로 받은 Place 테이블에 place_image 컬럼 추가
    private String placeImage;
}
