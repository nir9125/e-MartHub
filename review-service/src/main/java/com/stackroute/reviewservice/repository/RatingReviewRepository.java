package com.stackroute.reviewservice.repository;

import com.stackroute.reviewservice.model.RatingReview;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingReviewRepository extends MongoRepository<RatingReview,String> {
    public List<RatingReview> findByProductId(String productId);


}