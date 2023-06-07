package com.project.backend.data.repository;

import com.project.backend.places.repository.entity.Place;
import com.project.backend.places.repository.PlaceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class DataRepositoryTest {

    @Autowired private PlaceRepository placeRepository;

    @Test
    public void crudTest() {

        List<Place> placeSearch = placeRepository.findAll();
        for (Place place : placeSearch) {
            System.out.println(place.toString());
        }
    }
}
