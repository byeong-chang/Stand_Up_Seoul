package com.project.backend.places.service;

import com.project.backend.places.repository.entity.ContentType;

public interface ContentTypeService {

    ContentType getContentType(String contentName);
}
