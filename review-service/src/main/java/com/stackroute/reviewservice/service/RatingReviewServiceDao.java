package com.stackroute.reviewservice.service;

import com.stackroute.reviewservice.exception.CustomerRatingReviewAlreadyExists;
import com.stackroute.reviewservice.model.RatingReview;

import java.util.List;

public interface RatingReviewServiceDao {

    public RatingReview addRatingReview( RatingReview ratingReview) throws CustomerRatingReviewAlreadyExists;
    public RatingReview updateByRatingId(String ratingId,RatingReview ratingReview);
    void deleteRatingReviewByRatingId(String ratingId);
    public List<RatingReview> getRatingReviewByProductId(String prodcutId);// custom
    public List<RatingReview> getAllRatingReviews();
}
