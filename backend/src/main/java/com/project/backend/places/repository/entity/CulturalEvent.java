package com.project.backend.places.repository.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cultural_event")
public class CulturalEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "codename")
    private String codeName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private District district;

    @Column(name = "title")
    private String title;

    @Column(name = "place")
    private String place;

    @Column(name = "use_trgt")
    private String useTarget;

    @Column(name = "use_fee")
    private String useFee;

    @Column(name = "etc_desc")
    private String etcDescription;

    @Column(name = "org_link")
    private String orgLink;

    @Column(name = "main_img")
    private String mainImage;

    @Column(name = "rgstdate")
    private LocalDateTime registrationDate;

    @Column(name = "ticket")
    private String ticket;

    @Column(name = "strtdate")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "themecode")
    private String themeCode;

}
