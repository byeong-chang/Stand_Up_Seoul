package com.project.backend.accounts.service;

import com.project.backend.accounts.dto.HotplaceReviewDto;
import com.project.backend.accounts.repository.entity.HotplaceReview;
import com.project.backend.general.interfaces.Transfer;

import java.util.List;

public interface HotplaceReviewService extends Transfer {

    default HotplaceReviewDto entityToDto(HotplaceReview hotplaceReview){
        HotplaceReviewDto dto = HotplaceReviewDto.builder()
                .user(hotplaceReview.getUserId().getNickname())
                .hotPlaces(hotplaceReview.getHotPlacesId().getTitle())
                .review(hotplaceReview.getReview())
                .reviewImage(hotplaceReview.getReviewImage())
                .createdDate(hotplaceReview.getCreatedDate())
                .build();
        return dto;
    }

    List<HotplaceReviewDto> getHotplaceReview(int hotplaceId);
}
