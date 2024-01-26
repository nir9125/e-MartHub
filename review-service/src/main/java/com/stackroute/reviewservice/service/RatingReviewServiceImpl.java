package com.stackroute.reviewservice.service;

import com.stackroute.reviewservice.exception.CustomerRatingReviewAlreadyExists;//RatingandReview.exception.CustomerRatingReviewAlreadyExists;
import com.stackroute.reviewservice.model.RatingReview;//RatingandReview.model.RatingReview;
import com.stackroute.reviewservice.repository.RatingReviewRepository;//
// RatingReviewServiceDao//RatingandReview.repository.RatingReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingReviewServiceImpl implements RatingReviewServiceDao{
    @Autowired
    RatingReviewRepository repository;
    @Override
    public RatingReview addRatingReview(RatingReview ratingReview) throws CustomerRatingReviewAlreadyExists {
        Optional<RatingReview> optionalRatingReview = repository.findById(ratingReview.getRatingId());
//        Optional<RatingReview> optionalRatingReview2 = repository.findById(ratingReview.getCustomerId());

        if(optionalRatingReview.isEmpty()){
            RatingReview ratingReview1= repository.save(ratingReview);
            return ratingReview1;
        }
        else
            throw  new CustomerRatingReviewAlreadyExists("You already gave Rating and Review of this product");

    }

    @Override
    public List<RatingReview> getAllRatingReviews() {
        return repository.findAll();
    }


    @Override
    public void deleteRatingReviewByRatingId(String ratingId) {
        repository.deleteById(ratingId);
    }

    @Override
    public List<RatingReview> getRatingReviewByProductId(String prodcutId) {
        return repository.findByProductId(prodcutId);
    }

    public RatingReview updateByRatingId(String ratingId,RatingReview ratingReview){
        RatingReview ratingReview1= repository.save(ratingReview);
        return ratingReview1;
    }
}