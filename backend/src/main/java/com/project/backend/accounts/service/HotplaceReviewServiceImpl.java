package com.project.backend.accounts.service;

import com.project.backend.accounts.dto.HotplaceReviewDto;
import com.project.backend.accounts.repository.HotplaceReviewRepository;
import com.project.backend.accounts.repository.entity.HotplaceReview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HotplaceReviewServiceImpl implements HotplaceReviewService{

    public final HotplaceReviewRepository hotplaceReviewRepository;

    @Autowired
    public HotplaceReviewServiceImpl(HotplaceReviewRepository hotplaceReviewRepository) {
        this.hotplaceReviewRepository = hotplaceReviewRepository;
    }

    @Override
    public List<HotplaceReviewDto> getHotplaceReviews(int hotplaceId) {
        List<HotplaceReviewDto> hotplaceReviewDtoList = new ArrayList<>();
        for (HotplaceReview hotplaceReview : hotplaceReviewRepository.findHotplaces(hotplaceId)) {
            hotplaceReviewDtoList.add((HotplaceReviewDto) transfer(hotplaceReview));
        }
        return hotplaceReviewDtoList;
    }

    @Override
    public HotplaceReview getHotplaceReview(int hotplaceReviewId) {
        return hotplaceReviewRepository.findById(hotplaceReviewId);
    }

    @Override
    public void deleteReview(HotplaceReview hotplaceReview) {
        hotplaceReviewRepository.delete(hotplaceReview);
    }

    @Override
    public void saveReview(HotplaceReview hotplaceReview) {
        hotplaceReviewRepository.save(hotplaceReview);
    }

    @Override
    public Object transfer(Object entity) {
        HotplaceReviewDto dto = entityToDto((HotplaceReview) entity);
        return dto;
    }
}
