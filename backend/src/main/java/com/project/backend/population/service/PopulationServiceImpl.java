package com.project.backend.population.service;

import com.project.backend.general.returnType.LiveType;
import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.dto.PlaceDto;
import com.project.backend.places.dto.PlaceSubwayDto;
import com.project.backend.places.repository.entity.Place;
import com.project.backend.places.repository.entity.Subway;
import com.project.backend.places.service.*;
import com.project.backend.population.dto.PopulationDto;
import com.project.backend.population.repository.PopulationRepository;
import com.project.backend.population.repository.entity.Population;
import com.project.backend.restaurants.dto.RestaurantDto;
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
    PlaceService placeService;
    PlaceSubwayService placeSubwayService;

    @Autowired
    public PopulationServiceImpl(PopulationRepository populationRepository, RestaurantService restaurantService, CulturalEventService culturalEventService, HotPlacesService hotPlacesService, PlaceDistrictService placeDistrictService, PlaceService placeService, PlaceSubwayService placeSubwayService) {
        this.populationRepository = populationRepository;
        this.restaurantService = restaurantService;
        this.culturalEventService = culturalEventService;
        this.hotPlacesService = hotPlacesService;
        this.placeDistrictService = placeDistrictService;
        this.placeService = placeService;
        this.placeSubwayService = placeSubwayService;
    }

    @Override
    public Object transfer(Object entity) {
        PopulationDto dto = entityToDto((Population) entity);
        return  dto;
    }

    //List로 넘겨준 데이터들 중 count 개수만큼 데이터를 뽑아주는 함수입니다.
    public Object randomSelection(int count, List<Object> lists){
        List<Object> objectList = new ArrayList<>();
        List<Object> currentList= (List<Object>) lists.get(0);
        Collections.shuffle(currentList);

        try{
            for (int i=0;i<count;i++){
                objectList.add(currentList.get(i));
            }
        }catch (IndexOutOfBoundsException e){
            return objectList;
        }
        return objectList;

    }
    // Population에서 추출한 Place 데이터와 연결된 모든 정보를 긁어올 수 있는 함수입니다.
    public Map<Integer,LiveType> makePopulationApi(int count, List<Population> populations){
        // count 개수만큼 population 데이터를 뽑는다.
        Map<Integer,LiveType> liveTypeMap = new HashMap<Integer, LiveType>();
        for(int i=0;i<count;i++){ //혼잡도 여유가 4개 없으면 에러날듯 예외처리 필요
            //저장할 객체 liveType 입니다.
            LiveType liveType = new LiveType();
            // population 테이블을 기준으로 place 테이블에 접근합니다.
            Place currentPlace = populations.get(i).getPlace();

            // place 테이블을 기준으로 place_district -> district -> cultural_event에 접근합니다.
            List<CulturalEventDto> currentCulturalEvent = new ArrayList<>();
            currentPlace.getPlaceDistricts().forEach(placeDistrict -> {
                (placeDistrictService.entityToDto(placeDistrict)).getDistrict().getCulturalEventList()
                        .forEach(culturalEvent -> currentCulturalEvent.add((CulturalEventDto) culturalEventService.transfer(culturalEvent)));
            });
            //place 테이블을 기준으로 subway 테이블에 접근한다.
            List<Subway> subwayList = new ArrayList<>();
            currentPlace.getPlaceSubways().forEach(placeSubway -> subwayList.add(((PlaceSubwayDto) placeSubwayService.transfer(placeSubway)).getSubway()));
            // subway 테이블을 기준으로 subway -> hotpalces에 접근합니다.
            List<HotplacesDto> currentHotplaces= new ArrayList<>();
            subwayList.forEach(subway -> subway.getHotplacesList()
                    .forEach(hotplaces -> {
                        currentHotplaces.add((HotplacesDto) hotPlacesService.transfer(hotplaces));
                    }));
            // subway 테이블을 기준으로 subway -> restaurant에 접근합니다.
            List<RestaurantDto> currentRestaurant = new ArrayList<>();
            subwayList.forEach(subway -> {
                subway.getRestaurantList()
                        .forEach(restaurant -> currentRestaurant.add((RestaurantDto) restaurantService.transfer(restaurant)));
            });

            //liveType에 각 데이터를 넣어줍니다.
            liveType.setPopulation((PopulationDto) transfer(populations.get(i)));
            liveType.setPlace((PlaceDto) placeService.transfer(currentPlace));
            liveType.setCulturalEventList((List<CulturalEventDto>) randomSelection(4, Collections.singletonList(currentCulturalEvent)));
            liveType.setHotplacesList((List<HotplacesDto>) randomSelection(4, Collections.singletonList(currentHotplaces)));
            liveType.setRestaurantList((List<RestaurantDto>) randomSelection(4, Collections.singletonList(currentRestaurant)));
            liveTypeMap.put(i,liveType);
        }
        return  liveTypeMap;
    }

    // 실시간 home페이지
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
        //각 Place에 대한 hotplaces, restaurants ,cultural_event 데이터를 가져오는 함수 사용
        liveTypeMap = makePopulationApi(4,lowerCongest);
        return liveTypeMap;
    }

    //실시간 상세 페이지
    @Override
    public Map<String, PopulationDto> getDetail() {
        //getLive()를 참고하면 만들기 쉬움
        // 반환타입인 Map 형태로 데이터 만들고,
        //가장 최근 Population 데이터들 긁어옵니다.
        List<Population> populations= this.populationRepository.findTop48ByOrderByIdDesc();
        //for if문으로 원할 ,보통, 약간 붐빔, 붐빔 걸러주시고
        for(Population population :populations){ //for문 짜서
            if(population.getAreaCongest().getId()  == 1){
//                ~~.add(population); //나눠서 add로 담기
            }
        }
        //잘 담았으면 아까 만듬 Map 타입 return 해주기
        return null;
    }

    //실시간 Place 상세 페이지
    @Override
    public PlaceDto getPlaceDetail(int place_id) {
        //넘어온 place_id를 기준으로 데이터 넘겨주기
        return null;
    }
}
