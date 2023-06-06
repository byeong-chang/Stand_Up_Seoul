package com.project.backend.restaurants.repository.entity;
import com.project.backend.places.repository.entity.Subway;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "restaurant")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", length = 255)
    private String title;

    @Column(name = "new_address", length = 255)
    private String newAddress;

    @Column(name = "old_address", length = 255)
    private String oldAddress;

    @Column(name = "call_number", length = 20)
    private String callNumber;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private RestaurantCategory category;

    @Column(name = "parking", length = 20)
    private String parking;

    @Column(name = "holiday", length = 50)
    private String holiday;

    @Column(name = "website", length = 255)
    private String website;

    @ManyToOne
    @JoinColumn(name = "subway_id")
    private Subway subway;

    @Column(name = "file_name", length = 255)
    private String fileName;

    @Column(name = "created_date")
    private LocalDateTime createdDate;
}
