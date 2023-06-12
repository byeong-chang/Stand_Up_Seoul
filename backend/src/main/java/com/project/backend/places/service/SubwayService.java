package com.project.backend.places.service;
import com.project.backend.general.interfaces.Transfer;
import com.project.backend.places.dto.SubwayDto;
import com.project.backend.places.repository.entity.Subway;

public interface SubwayService extends Transfer{

    default SubwayDto entityToDto(Subway subway){
        SubwayDto dto = SubwayDto.builder()
                .id(subway.getId())
                .subwayName(subway.getSubwayName())
                .build();
        return dto;
    }
}
