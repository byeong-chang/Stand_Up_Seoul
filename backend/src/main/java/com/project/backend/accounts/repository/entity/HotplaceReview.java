package com.project.backend.accounts.repository.entity;


import groovyjarjarantlr4.v4.runtime.misc.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Data
@Table(name = "hotplaces_review")
public class HotplaceReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "hotplaces_id")
    private int hotPlacesId;

    @NotNull
    @Column(name = "review", columnDefinition = "TEXT")
    private String review;

    @Column(name = "review_img", columnDefinition = "TEXT")
    private String reviewImage;

    @Column(name = "created_date")
    private LocalDateTime createdDate;
}
