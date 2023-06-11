package com.project.backend.population.service;

import com.project.backend.general.interfaces.Transfer;
import com.project.backend.general.returnType.LiveType;
import com.project.backend.places.dto.PlaceDto;
import com.project.backend.population.dto.PopulationDto;
import com.project.backend.population.repository.entity.Population;

import java.util.Map;

public interface PopulationService extends Transfer {
    Map<Integer,LiveType> getLive();

    default PopulationDto enttiyToDto(Population population){
        PopulationDto dto = PopulationDto.builder()
                .id(population.getId())
                .place(population.getPlace().getAreaName())
                .areaCongest(population.getAreaCongest())
                .areaPopulationMin(population.getAreaPopulationMin())
                .areaPopulationMax(population.getAreaPopulationMax())
                .malePopulationRate(population.getMalePopulationRate())
                .femalePopulationRate(population.getFemalePopulationRate())
                .populationRate0(population.getPopulationRate0())
                .populationRate10(population.getPopulationRate10())
                .populationRate20(population.getPopulationRate20())
                .populationRate30(population.getPopulationRate30())
                .populationRate40(population.getPopulationRate40())
                .populationRate50(population.getPopulationRate50())
                .populationRate60(population.getPopulationRate60())
                .populationRate70(population.getPopulationRate70())
                .residentPopulationRate(population.getResidentPopulationRate())
                .nonResidentPopulationRate(population.getNonResidentPopulationRate())
                .populationTime(population.getPopulationTime())
                .createdDate(population.getCreatedDate()).build();
        return dto;
    }

    Map<String, PopulationDto> getDetail();

    PlaceDto getPlaceDetail(int place_Id);
}
