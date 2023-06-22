package com.project.backend.places.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "subway_detail")
public class SubwayDetail {
    @Id
    @Column(name = "subway_nb")
    private int subwayNb;

    @Column(name = "line", length = 255)
    private String line;

    @ManyToOne
    @JoinColumn(name = "subway_id")
    private Subway subway;

    @Column(name = "station_callnb", length = 15)
    private String stationCallNumber;

    @Column(name = "sub_stn_raddr_new", length = 255)
    private String subStnRaddrNew;

    @Column(name = "sub_stn_raddr_old", length = 255)
    private String subStnRaddrOld;

    @Column(name = "sub_stn_x")
    private double subStnX;

    @Column(name = "sub_stn_y")
    private double subStnY;

    @Column(name = "q1")
    private int q1;

    @Column(name = "q2")
    private int q2;

    @Column(name = "q3")
    private int q3;
}
