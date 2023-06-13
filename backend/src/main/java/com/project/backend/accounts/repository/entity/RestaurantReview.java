package com.project.backend.accounts.repository.entity;

import com.project.backend.restaurants.repository.entity.Restaurant;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Data
@Table(name = "restaurantReview")
public class RestaurantReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user_id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant_id;

    @Column(name = "review", columnDefinition = "TEXT")
    private String review;

    @Column(name = "review_img", columnDefinition = "TEXT")
    private String reviewImg;

    @UpdateTimestamp
    @Column(name = "created_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable= false)
    private LocalDateTime createdDate;

}
