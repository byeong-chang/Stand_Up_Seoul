package com.project.backend.population.repository;

import com.project.backend.places.repository.entity.CulturalEvent;
import com.project.backend.population.repository.entity.Population;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class populationRepositoryTest {

    PopulationRepository populationRepository;

    @Autowired
    public populationRepositoryTest(PopulationRepository populationRepository) {
        this.populationRepository = populationRepository;
    }

    @Test
    void testJpa1() {
        List<Population> populations= this.populationRepository.findTop48ByOrderByIdDesc();
        List<Population> lowerCongest = new ArrayList<Population>();
        for(Population population :populations){
            if(population.getAreaCongest().getId()  == 1){
                lowerCongest.add(population);
            }
        }
        Collections.shuffle(lowerCongest);



    }
//    @Test
//    void testJpa2() {
//        List<Population> populations = this.populationRepository.findTop48ByIdOrderByDesc();
//        for(Population population :populations){
//            System.out.println(population);
//        }
//        System.out.println(populations.stream().count());
//    }
    @Test
    void testJpa3() {
        List<Population> populations = this.populationRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
        for(Population population :populations){
            System.out.println(population);
        }
    }
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
}
