package com.project.backend.places.dto;

import com.project.backend.places.repository.entity.ContentType;
import com.project.backend.places.repository.entity.Subway;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotplacesDto {
    private int id;
    private int contentId;
    private ContentType contentType;
    private double mapX;
    private double mapY;
    private String title;
//    private Subway subway;
    private String fileName;
    private String address;
    private LocalDateTime createdDate;
}
