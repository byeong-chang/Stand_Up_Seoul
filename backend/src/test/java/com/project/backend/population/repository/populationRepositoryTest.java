package com.project.backend.population.repository;

import com.project.backend.places.repository.CulturalEventRepository;
import com.project.backend.places.repository.PlaceCategoryRepository;
import com.project.backend.places.repository.entity.CulturalEvent;
import com.project.backend.places.repository.entity.PlaceCategory;
import com.project.backend.population.repository.entity.Population;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;

@SpringBootTest
public class populationRepositoryTest {

    CulturalEventRepository culturalEventRepository;
    PlaceCategoryRepository placeCategoryRepository;

    @Autowired
    public populationRepositoryTest( CulturalEventRepository culturalEventRepository, PlaceCategoryRepository placeCategoryRepository) {
        this.culturalEventRepository = culturalEventRepository;
        this.placeCategoryRepository = placeCategoryRepository;
    }


//    @Test
//    void testJpa1() {
//        List<Population> populations = this.populationRepository.findTop48OrderByIdDesc();
//        for(Population population :populations){
//            System.out.println(population);
//        }
//    }
//    @Test
//    void testJpa2() {
//        List<Population> populations = this.populationRepository.findAllOrderByIdDesc();
//        for(Population population :populations){
//            System.out.println(population);
//        }
//    }
//    @Test
//    void testJpa3() {
//        List<Population> populations = this.populationRepository.findAllByIdDesc();
//        for(Population population :populations){
//            System.out.println(population);
//        }
//    }
//    @Test
//    void testJpa4() {
//        int id = 4;
//        Population population = this.populationRepository.findById(4).get();
//        System.out.println(population);
//    }
//
//    @Test
//    void testJpa5() {
//        List<PlaceCategory> placeCategories = this.placeCategoryRepository.findAll();
//        for(PlaceCategory palceCategory :placeCategories){
//            System.out.println(palceCategory);
//        }
//    }

    @Test
    void testJpa6() {
        List<CulturalEvent> culturalEvents = this.culturalEventRepository.findAll();
        for(CulturalEvent culturalEvent  :culturalEvents){
            System.out.println(culturalEvent);
        }
    }
}
