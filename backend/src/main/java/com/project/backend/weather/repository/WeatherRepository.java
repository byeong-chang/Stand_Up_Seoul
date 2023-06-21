package com.project.backend.weather.repository;

import com.project.backend.weather.repository.entity.WeatherFcst;
import org.springframework.data.jpa.repository.JpaRepository;
public interface WeatherRepository extends JpaRepository<WeatherFcst,Integer> {
}
