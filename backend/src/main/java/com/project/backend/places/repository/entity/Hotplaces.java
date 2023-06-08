package com.project.backend.places.repository.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    @Column(name = "created_date")
    private LocalDateTime createdDate;

}
