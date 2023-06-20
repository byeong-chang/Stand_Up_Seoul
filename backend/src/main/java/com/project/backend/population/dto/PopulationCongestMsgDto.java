package com.project.backend.population.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PopulationCongestMsgDto {

    private int id;

    private String areaCongestLevel;

    private String areaCongestMessage;

}
