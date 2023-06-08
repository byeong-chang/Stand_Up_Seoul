package com.project.backend.weather.repository.entity;
import com.project.backend.places.repository.entity.Place;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "weather")
public class Weather {
    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @Column(name = "temp")
    private double temperature;

    @Column(name = "sensible_temp")
    private double sensibleTemperature;

    @Column(name = "max_temp")
    private double maxTemperature;

    @Column(name = "min_temp")
    private double minTemperature;

    @Column(name = "humidity")
    private int humidity;

    @Column(name = "wind_dirct", length = 10)
    private String windDirection;

    @Column(name = "wind_spd")
    private double windSpeed;

    @Column(name = "precipitation")
    private double precipitation;

    @Column(name = "precpt_type", length = 10)
    private String precipitationType;

    @Column(name = "pcp_msg", length = 255)
    private String precipitationMessage;

    @Column(name = "uv_index_lvl")
    private int uvIndexLevel;

    @Column(name = "uv_index", length = 10)
    private String uvIndex;

    @Column(name = "uv_msg", length = 255)
    private String uvMessage;

    @Column(name = "pm25_index", length = 10)
    private String pm25Index;

    @Column(name = "pm25")
    private int pm25;

    @Column(name = "pm10_index", length = 10)
    private String pm10Index;

    @Column(name = "pm10")
    private int pm10;

    @Column(name = "air_idx")
    private int airIndex;

    @Column(name = "air_idx_mvl")
    private int airIndexMvl;

    @Column(name = "air_msg", length = 255)
    private String airMessage;

    @Column(name = "weather_time")
    private LocalDateTime weatherTime;

    @Column(name = "created_date")
    private LocalDateTime createdDate;
}
