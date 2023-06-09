package com.project.backend.restaurants.repository.entity;

import com.project.backend.places.repository.entity.Subway;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "restaurant")
@Data
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

    @ColumnDefault("0")
    private int likeCount;

    @ColumnDefault("0")
    private int clickCount;

    @ColumnDefault("0")
    private int reviewCount;

    @ColumnDefault("0")
    private double starRating;

    @Column(name = "mapx", columnDefinition = "DOUBLE DEFAULT 0")
    private double mapx;

    @Column(name = "mapy", columnDefinition = "DOUBLE DEFAULT 0")
    private double mapy;

    @OneToMany(mappedBy = "restaurant")
    private List<RestaurantRuntime> runtimeList;
}
