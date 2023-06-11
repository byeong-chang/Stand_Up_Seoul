package com.project.backend.places.repository.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "district")
@Getter
public class District {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "district_nm")
    private String districtName;

    // 연결 테이블(MEMBER_PRODUCT)쪽이 외래키를 갖고있기 때문에, 연결 테이블이 연관관계의 주인이다.
    @OneToMany(mappedBy = "district")
    private List<PlaceDistrict> placeDistricts;

    @OneToMany(mappedBy = "district")
    private List<CulturalEvent> culturalEventList;
}

