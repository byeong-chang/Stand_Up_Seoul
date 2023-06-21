package com.project.backend.places.repository.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "place")
@Getter
public class Place {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "area_nm",length = 30)
    private String areaName;

    @ManyToOne
    @JoinColumn(name="category_id")
    private PlaceCategory placeCategory;

    // 연결 테이블(MEMBER_PRODUCT)쪽이 외래키를 갖고있기 때문에, 연결 테이블이 연관관계의 주인이다.
    @OneToMany(mappedBy = "place")
    private List<PlaceDistrict> placeDistricts;

    // 연결 테이블(MEMBER_PRODUCT)쪽이 외래키를 갖고있기 때문에, 연결 테이블이 연관관계의 주인이다.
    @OneToMany(mappedBy = "place")
    private List<PlaceSubway> placeSubways;

    @Column(name = "place_image",length = 255)
    private String placeImage;

    @Column(name = "mapx")
    private double mapx;

    @Column(name = "mapy")
    private double mapy;

}
