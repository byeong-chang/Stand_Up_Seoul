package com.project.backend.places.service;

import com.project.backend.accounts.dto.HotplaceReviewDto;
import com.project.backend.accounts.service.HotplaceReviewService;
import com.project.backend.general.returnType.HotplaceType;
import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.repository.HotplacesRepository;
import com.project.backend.places.repository.entity.Hotplaces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotPlacesServiceImpl implements HotPlacesService{
    HotplacesRepository hotplacesRepository;
    HotplaceReviewService hotplaceReviewService;

    @Autowired
    public HotPlacesServiceImpl(HotplacesRepository hotplacesRepository, HotplaceReviewService hotplaceReviewService) {
        this.hotplacesRepository = hotplacesRepository;
        this.hotplaceReviewService = hotplaceReviewService;
    }



    @Override
    public Object transfer(Object entity) {
        HotplacesDto dto =entityToDto((Hotplaces) entity);
        return dto;
    }

    @Override
    public HotplaceType getBoard(int hotplace_id) {
        HotplaceType hotplaceType = new HotplaceType();
        Optional<Hotplaces> entity = hotplacesRepository.findById(hotplace_id);
        HotplacesDto hotplacesDto = (HotplacesDto) transfer(entity.get());
        List<HotplaceReviewDto> hotplaceReviewDtoList = hotplaceReviewService.getHotplaceReview(hotplace_id);

        hotplaceType.setHotplacesDto(hotplacesDto);
        hotplaceType.setHotplaceReviewDtos(hotplaceReviewDtoList);
        return hotplaceType;
    }
}
