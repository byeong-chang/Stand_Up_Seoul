package com.project.backend.population.service;

import com.project.backend.general.returnType.LiveType;
import com.project.backend.places.dto.CulturalEventDto;
import com.project.backend.places.dto.HotplacesDto;
import com.project.backend.places.dto.PlaceDto;
import com.project.backend.places.dto.PlaceSubwayDto;
import com.project.backend.places.repository.PlaceRepository;
import com.project.backend.places.repository.entity.Place;
import com.project.backend.places.repository.entity.Subway;
import com.project.backend.places.service.*;
import com.project.backend.population.dto.PopulationDto;
import com.project.backend.population.repository.PopulationRepository;
import com.project.backend.population.repository.entity.Population;
import com.project.backend.restaurants.dto.RestaurantDto;
import com.project.backend.restaurants.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PopulationServiceImpl implements PopulationService{

    public final PopulationRepository populationRepository;
    public final RestaurantService restaurantService;
    public final CulturalEventService culturalEventService;
    public final HotPlacesService hotPlacesService;
    public final PlaceDistrictService placeDistrictService;
    public final PlaceService placeService;
    public final PlaceSubwayService placeSubwayService;
    public final PlaceRepository placeRepository;
    @PersistenceContext
    private EntityManager entityManager;

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

    public Double distance(Double Logitude, Double Latitude, Double x, Double y){
        return Math.sqrt((Logitude - x)*(Logitude - x) + (Latitude - y)*(Latitude - y));
    }
    @Override
    public Map<Integer, LiveType> getLocationLive(Double Logitude, Double Latitude) {
        //웹에 전달할 json 객체 liveTypeMap입니다.
        Map<Integer,LiveType> liveTypeMap = new HashMap<Integer, LiveType>();
        // 가장 최근 48개의 혼잡도 데이터를 가져옵니다.
        List<Population> populations= this.populationRepository.findTop48ByOrderByIdDesc();
        // x,y 값의 제곱의 차를 사용해 현재 위치와 populations들의 위치를 비교하여 딕셔너리에 담는다.
        HashMap<Integer, Double> cosDistance = new HashMap<Integer, Double>();
        // 가장 유사한 4개의 Population을 담을 리스트입니다.
        List<Population> simPopulation = new ArrayList<>();
        // congest_id = 1 인 경우 여유로운 혼잡도이므로 lowerCongest에 담아줍니다.
        for(int i = 0 ; i <48; i ++){
            Population temp = populations.get(i);
            if (temp.getAreaCongest().getId() == 1) {
                Double distance = distance(Logitude, Latitude, temp.getPlace().getMapx(), temp.getPlace().getMapy());
                cosDistance.put(i, distance);
            }
        }
        //정렬 value 기준으로 정렬해서 앞에 4개 넣어주기
        List<Integer> keySet = new ArrayList<>(cosDistance.keySet());
        // Value 값으로 오름차순 정렬
        keySet.sort((o1, o2) -> cosDistance.get(o1).compareTo(cosDistance.get(o2)));
        for (int i=0; i<4;i++){
            simPopulation.add(populations.get(keySet.get(i)));
        }
        //각 Place에 대한 hotplaces, restaurants ,cultural_event 데이터를 가져오는 함수 사용
        liveTypeMap = makePopulationApi(4,simPopulation);
        return liveTypeMap;
    }

    //실시간 상세 페이지
    @Override
    public Map<String, List<PopulationDto>> getDetail() {
        //웹에 전달할 json 객체 liveTypeMap입니다.
        Map<String, List<PopulationDto>> listTypeMap = new HashMap<>();

        //JPQL를 사용하여 데이터베이스에서 Population 엔티티를 이용해 Place 엔티티를 함께 조회
//        String jpql = "SELECT p FROM Population p JOIN FETCH p.place ORDER BY p.createdDate DESC";
//        TypedQuery<Population> query = entityManager.createQuery(jpql, Population.class);
//        query.setMaxResults(48);
//        List<Population> populations = query.getResultList();
        List<Population> populations= this.populationRepository.findTop48ByOrderByIdDesc();
        //여유, 보통, 약간 붐빔, 붐빔으로 나눠 받을 리스트 만들기
        List<PopulationDto> lowerCongest = new ArrayList<>();
        List<PopulationDto> normalCongest = new ArrayList<>();
        List<PopulationDto> crowdedCongest = new ArrayList<>();
        List<PopulationDto> overcrowdedCongest = new ArrayList<>();
        //for if문으로 여유, 보통, 약간 붐빔, 붐빔 걸러 각 리스트별로 담기
        for (Population population : populations) {
            if (population.getAreaCongest().getId() == 1) {
                lowerCongest.add((PopulationDto) transfer(population));
            } else if (population.getAreaCongest().getId() == 2) {
                normalCongest.add((PopulationDto) transfer(population));
            } else if (population.getAreaCongest().getId() == 3) {
                crowdedCongest.add((PopulationDto) transfer(population));
            } else if (population.getAreaCongest().getId() == 4) {
                overcrowdedCongest.add((PopulationDto) transfer(population));
            } else {
                continue;
            }
        }
        // 각 혼잡도 리스트별로 Map 타입에 넣기
        listTypeMap.put("여유", lowerCongest);
        listTypeMap.put("보통", normalCongest);
        listTypeMap.put("약간 붐빔", crowdedCongest);
        listTypeMap.put("붐빔", overcrowdedCongest);

        return listTypeMap;
    }

    //실시간 Place 상세 페이지
    @Override
    public Map<Integer, LiveType> getPlaceDetail(int place_id) {
        //웹에 전달할 json 객체 liveTypeMap을 선언
        Map<Integer, LiveType> liveTypeMap = new HashMap<>();
        //가장 최근 Population 데이터들 긁어오기
        List<Population> populations = this.populationRepository.findTop48ByOrderByIdDesc();
        //48개 혼잡도 공간 중 여유인 데이터를 담을 리스트
        List<Population> populationList = new ArrayList<>();
        //해당 place_id으로 받아온 데이터를 populations에 담기
        for (Population population : populations) {
            if (population.getPlace().getId() == place_id) {
                populationList.add(population);
            }
        }
        //makePopulationApi 함수를 통해서 각 Place에 대한 hotplaces, restaurants ,cultural_event 데이터를 가져와 liveTypeMap에 담기
        liveTypeMap = makePopulationApi(1, populationList);
        return liveTypeMap;
    }
}
