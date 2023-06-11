package com.project.backend.places.service;

import com.project.backend.general.interfaces.Transfer;
import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.repository.entity.CulturalEvent;

public interface CulturalEventService extends Transfer {

    default CulturalEventDto enttiyToDto(CulturalEvent culturalEvent){
        CulturalEventDto dto = CulturalEventDto.builder()
                .id(culturalEvent.getId())
                .codeName(culturalEvent.getCodeName())
                .district(culturalEvent.getDistrict().getDistrictName())
                .title(culturalEvent.getTitle())
                .place(culturalEvent.getPlace())
                .useTarget(culturalEvent.getUseTarget())
                .useFee(culturalEvent.getUseFee())
                .etcDescription(culturalEvent.getEtcDescription())
                .orgLink(culturalEvent.getOrgLink())
                .mainImage(culturalEvent.getMainImage())
                .registrationDate(culturalEvent.getRegistrationDate())
                .ticket(culturalEvent.getTicket())
                .startDate(culturalEvent.getStartDate())
                .endDate(culturalEvent.getEndDate())
                .themeCode(culturalEvent.getThemeCode())
                .build();
        return dto;
    }
}
