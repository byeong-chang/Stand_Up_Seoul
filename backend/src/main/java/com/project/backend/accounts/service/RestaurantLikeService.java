package com.project.backend.accounts.service;


import com.project.backend.accounts.dto.RestaurantLikeDto;
import com.project.backend.accounts.repository.RestaurantLikeRepository;
import com.project.backend.accounts.repository.entity.RestaurantLike;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RestaurantLikeService {

    public final RestaurantLikeRepository restaurantLikeRepository;

    public void saveRestaurantLike(RestaurantLike restaurantLike){
        restaurantLikeRepository.save(restaurantLike);
    }
    public RestaurantLike getRestaurantLike(int id){
        return restaurantLikeRepository.findById(id).get();
    }
    public void deleteRestaurantLike(RestaurantLike restaurantLike){
        restaurantLikeRepository.delete(restaurantLike);
    }
    public RestaurantLikeDto getByUserIdAndRestaurantId(int restaurantId, int userId){

        try{
            return RestaurantLikeDto.builder().id(
                            restaurantLikeRepository.findByUserIdAndRestaurantId(restaurantId,userId).getId())
                    .build();
        }
        catch (NullPointerException e){
            return RestaurantLikeDto.builder().id(-1)
                    .build();
        }

    }
}
