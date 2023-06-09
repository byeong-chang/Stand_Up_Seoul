package com.project.backend.population.service;

import com.project.backend.controller.LiveType;
import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.dto.SubwayDto;
import com.project.backend.places.repository.entity.Place;
import com.project.backend.places.service.*;
import com.project.backend.population.dto.PopulationDto;
import com.project.backend.population.repository.PopulationRepository;
import com.project.backend.population.repository.entity.Population;
import com.project.backend.restaurants.repository.dto.RestaurantDto;
import com.project.backend.restaurants.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PopulationServiceImpl implements PopulationService{

    PopulationRepository populationRepository;
    RestaurantService restaurantService;
    CulturalEventService culturalEventService;
    HotPlacesService hotPlacesService;
    PlaceDistrictService placeDistrictService;
    SubwayService subwayService;

    @Autowired
    public PopulationServiceImpl(PopulationRepository populationRepository, RestaurantService restaurantService, CulturalEventService culturalEventService, HotPlacesService hotPlacesService, PlaceDistrictService placeDistrictService, SubwayService subwayService) {
        this.populationRepository = populationRepository;
        this.restaurantService = restaurantService;
        this.culturalEventService = culturalEventService;
        this.hotPlacesService = hotPlacesService;
        this.placeDistrictService = placeDistrictService;
        this.subwayService = subwayService;
    }

    @Override
    public PopulationDto transfer(Population entity) {
        PopulationDto dto = enttiyToDto(entity);
        return dto;
    }

    @Override
    public Population getPopulation(int id) {
        Optional<Population> optionalPopulation = populationRepository.findById(id);
        return optionalPopulation.get();
    }

    @Override
    public Map<Integer,LiveType> getLive() {
        //웹에 전달할 json 객체 liveTypeMap입니다.
        Map<Integer,LiveType> liveTypeMap = new HashMap<Integer, LiveType>();
        // 가장 최근 48개의 혼잡도 데이터를 가져옵니다.
        List<Population> populations= this.populationRepository.findTop48ByOrderByIdDesc();
        // 48개 혼잡도 공간 중 여유인 데이터를 담을 리스트입니다.
        List<Population> lowerCongest = new ArrayList<>();
        // congest_id = 1 인 경우 여유로운 혼잡도이므로 lowerCongest에 담아줍니다.
        for(Population population :populations){
            if(population.getAreaCongest().getId()  == 1){
                lowerCongest.add(population);
            }
        }
        // 랜덤성을 위해 섞어줍니다.
        Collections.shuffle(lowerCongest);
        // 4개의 데이터만을 사용할 것이기 때문에 랜덤하게 섞은 혼잡도 데이터의 리스트 4개를 가져옵니다.
        for(int i=0;i<4;i++){ //혼잡도 여유가 4개 없으면 에러날듯 예외처리 필요
            //저장할 객체 liveType 입니다.
            LiveType liveType = new LiveType();
            // population 테이블을 기준으로 place 테이블에 접근합니다.
            Place currentPlace = lowerCongest.get(i).getPlace();

            // place 테이블을 기준으로 place_district -> district -> cultural_event에 접근합니다.
            List<CulturalEventDto> currentCulturalEvent = new ArrayList<>();
            currentPlace.getPlaceDistricts().forEach(placeDistrict -> {
                placeDistrictService.transfer(placeDistrict).getDistrict().getCulturalEventList()
                        .forEach(culturalEvent -> currentCulturalEvent.add(culturalEventService.transfer(culturalEvent)));
            });
            //place 테이블을 기준으로 subway 테이블에 접근한다.
            List<SubwayDto> subwayList = new ArrayList<>();
            currentPlace.getPlaceSubways().forEach(placeSubway -> subwayList.add(subwayService.transfer(placeSubway.getSubway())));
            // subway 테이블을 기준으로 subway -> hotpalces에 접근합니다.
            List<HotplacesDto> currentHotplaces= new ArrayList<>();
            subwayList.forEach(subway -> subway.getHotplacesList()
                    .forEach(hotplaces -> {
                        currentHotplaces.add(hotPlacesService.transfer(hotplaces));
                    }));
            // subway 테이블을 기준으로 subway -> restaurant에 접근합니다.
            List<RestaurantDto> currentRestaurant = new ArrayList<>();
            subwayList.forEach(subway -> {
                subway.getRestaurantList()
                        .forEach(restaurant -> currentRestaurant.add(restaurantService.transfer(restaurant)));

            });

            //liveType에 각 데이터를 넣어줍니다.
            liveType.setPopulation(transfer(lowerCongest.get(i)));
            liveType.setCulturalEventList(currentCulturalEvent);
            liveType.setHotplacesList(currentHotplaces);
            liveType.setRestaurantList(currentRestaurant);
            liveTypeMap.put(i,liveType);
        }
        return liveTypeMap;
    }
}
