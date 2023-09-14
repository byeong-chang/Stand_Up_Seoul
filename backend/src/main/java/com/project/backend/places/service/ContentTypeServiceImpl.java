package com.project.backend.places.service;

import com.project.backend.places.repository.ContentTypeRepository;
import com.project.backend.places.repository.entity.ContentType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContentTypeServiceImpl implements ContentTypeService{

    private final ContentTypeRepository contentTypeRepository;


    @Override
    public ContentType getContentType(String contentName) {
        return contentTypeRepository.findByContentTypeName(contentName);
    }
}
