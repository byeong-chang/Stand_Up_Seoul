package com.project.backend.weather.repository.entity;
import com.project.backend.places.repository.entity.Place;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "weather_fcst")
public class WeatherFcst {
    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @Column(name = "fcst_dt")
    private LocalDateTime forecastDateTime;

    @Column(name = "temp")
    private int temperature;

    @Column(name = "precipitation", length = 10)
    private String precipitation;

    @Column(name = "precpt_type", length = 10)
    private String precipitationType;

    @Column(name = "rain_chance")
    private int rainChance;

    @Column(name = "sky_stts", length = 10)
    private String skyStatus;

    @Column(name = "created_date")
    private LocalDateTime createdDate;
}
