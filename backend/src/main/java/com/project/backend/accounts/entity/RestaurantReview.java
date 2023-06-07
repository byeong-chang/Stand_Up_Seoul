package com.project.backend.accounts.entity;

import com.project.backend.restaurants.repository.entity.Restaurant;
import com.sun.istack.NotNull;
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
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_email")
    private User user;

    @NotNull
    @UpdateTimestamp
    @Column(name = "create_date")
    private LocalDateTime createdDate;

    @NotNull
    @Column(name = "restaurant_review", columnDefinition = "TEXT", length = 500) // 리뷰 글자수 500자로 제한
    private String restaurantReview;

    @NotNull
    @Column(name = "restaurant_eval")
    private int restaurantEval;

    @Column(name = "review_img", columnDefinition = "TEXT")
    private String reviewImg;

}
