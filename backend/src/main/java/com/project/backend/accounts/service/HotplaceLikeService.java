package com.project.backend.accounts.service;

import com.project.backend.accounts.dto.HotplaceLikeDto;
import com.project.backend.accounts.repository.HotplaceLikeRepository;
import com.project.backend.accounts.repository.entity.HotplaceLike;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HotplaceLikeService {

    public final HotplaceLikeRepository hotplaceLikeRepository;

    public HotplaceLike getHotplaceLike(int id) {
        return hotplaceLikeRepository.findById(id).get();
    }

    public void deleteHotplaceLike(HotplaceLike hotplaceLike) {
        hotplaceLikeRepository.delete(hotplaceLike);
    }

    public void saveHotplaceLike(HotplaceLike hotplaceLike) {
        hotplaceLikeRepository.save(hotplaceLike);
    }

    public HotplaceLikeDto getByUserIdAndHotplaceId(int hotplaceId, int userId) {
        try {
            return HotplaceLikeDto.builder()
                    .id(hotplaceLikeRepository.findByUserIdAndHotplaceId(hotplaceId, userId).getId())
                    .build();
        } catch (NullPointerException e) {
            return HotplaceLikeDto.builder().id(-1)
                    .build();
        }
    }
}
