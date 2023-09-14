package com.project.backend.places.repository.entity;

import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "hotplaces")
public class Hotplaces {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "content_id")
    private int contentId;

    @ManyToOne
    @JoinColumn(name = "content_type_id")
    private ContentType contentType;

    @Column(name = "mapx")
    private double mapX;

    @Column(name = "mapy")
    private double mapY;

    @Column(name = "title", length = 255)
    private String title;

    @ManyToOne
    @JoinColumn(name = "subway_id")
    private Subway subway;

    @Column(name = "file_name", length = 255)
    private String fileName;

    @Column(name = "addr", length = 255)
    private String address;

    @UpdateTimestamp
    @Column(name = "created_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable= false)
    private LocalDateTime createdDate;

    @Column(name = "click_count", columnDefinition = "INT DEFAULT 0")
    private int clickCount;

    @Column(name = "like_count", columnDefinition = "INT DEFAULT 0")
    private int likeCount;

    @Column(name = "review_count", columnDefinition = "INT DEFAULT 0")
    private int reviewCount;

    @Column(name = "star_rating", columnDefinition = "INT DEFAULT 0")
    private double starRating;


}
