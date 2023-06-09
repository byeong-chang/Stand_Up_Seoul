package com.project.backend.places.dto;

import com.project.backend.places.repository.entity.District;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CulturalEventDto {
    private int id;
    private String codeName;
//    private District district;
    private String title;
    private String place;
    private String useTarget;
    private String useFee;
    private String etcDescription;
    private String orgLink;
    private String mainImage;
    private LocalDateTime registrationDate;
    private String ticket;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String themeCode;
}
