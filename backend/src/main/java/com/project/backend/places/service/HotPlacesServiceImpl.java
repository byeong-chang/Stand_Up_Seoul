package com.project.backend.places.service;

import com.project.backend.accounts.dto.HotplaceReviewDto;
import com.project.backend.accounts.service.HotplaceLikeService;
import com.project.backend.accounts.service.HotplaceReviewService;
import com.project.backend.general.returnType.HotplaceType;
import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.repository.HotplacesRepository;
import com.project.backend.places.repository.entity.Hotplaces;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class HotPlacesServiceImpl implements HotPlacesService{
    private final HotplacesRepository hotplacesRepository;
    private final HotplaceReviewService hotplaceReviewService;
    private final HotplaceLikeService hotplaceLikeService;

    @Override
    public Object transfer(Object entity) {
        HotplacesDto dto =entityToDto((Hotplaces) entity);
        return dto;
    }

    @Override
    public HotplaceType getBoard(int hotplaceId, int userId) {
        HotplaceType hotplaceType = new HotplaceType();
        Optional<Hotplaces> entity = hotplacesRepository.findById(hotplaceId);
        HotplacesDto hotplacesDto = (HotplacesDto) transfer(entity.get());
        List<HotplaceReviewDto> hotplaceReviewDtoList = hotplaceReviewService.getHotplaceReviews(hotplaceId);

        hotplaceType.setHotplacesDto(hotplacesDto);
        hotplaceType.setHotplaceLikeDto(hotplaceLikeService.getByUserIdAndHotplaceId(hotplaceId,userId));
        hotplaceType.setHotplaceReviewDtos(hotplaceReviewDtoList);
        return hotplaceType;
    }

    @Override
    public Hotplaces getHotplace(int hotplaceId) {
        Optional<Hotplaces> hotplaces = hotplacesRepository.findById(hotplaceId);
        return hotplaces.get();
    }
}
