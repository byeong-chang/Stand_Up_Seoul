package com.project.backend.weather.repository;

import com.project.backend.weather.repository.entity.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
public interface WeatherFcstRepository extends JpaRepository<Weather,Integer> {
}
