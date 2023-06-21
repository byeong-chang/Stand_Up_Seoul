package com.project.backend.general.returnType;

import com.project.backend.accounts.dto.HotplaceReviewDto;
import com.project.backend.places.dto.HotplacesDto;
import lombok.Data;

import java.util.List;

@Data
public class HotplaceType {
    HotplacesDto hotplacesDto;
    List<HotplaceReviewDto> hotplaceReviewDtos;
}
