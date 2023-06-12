package com.project.backend.places.service;

import com.project.backend.general.interfaces.Transfer;
import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.repository.entity.Hotplaces;

public interface HotPlacesService extends Transfer {


    default HotplacesDto entityToDto(Hotplaces hotplaces){
        HotplacesDto dto = HotplacesDto.builder()
                .id(hotplaces.getId())
                .contentId(hotplaces.getContentId())
                .contentType(hotplaces.getContentType().getContentTypeName())
                .mapX(hotplaces.getMapX())
                .mapY(hotplaces.getMapY())
                .title(hotplaces.getTitle())
                .subway(hotplaces.getSubway().getSubwayName())
                .fileName(hotplaces.getFileName())
                .address(hotplaces.getAddress())
                .createdDate(hotplaces.getCreatedDate())
                .bookmarkCount(hotplaces.getBookmarkCount())
                .clickCount(hotplaces.getClickCount())
                .likeCount(hotplaces.getLikeCount())
                .reviewCount(hotplaces.getReviewCount())
                .starRating(hotplaces.getStarRating())
                .build();
        return dto;
    }

    CulturalEventDto getBoard(int id);
}
