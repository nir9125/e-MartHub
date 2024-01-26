package com.stackroute.reviewservice.controller;


import com.stackroute.reviewservice.service.RatingReviewServiceImpl;//RatingandReview.exception.CustomerRatingReviewAlreadyExists;
import com.stackroute.reviewservice.model.RatingReview;//RatingandReview.model.RatingReview;
import com.stackroute.reviewservice.exception.CustomerRatingReviewAlreadyExists;//RatingandReview.service.RatingReviewServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.SimpleTimeZone;
import java.util.UUID;

@RestController
@RequestMapping("customerRatingReview")
@CrossOrigin("*")
public class RatingReviewController {
    @Autowired
    RatingReviewServiceImpl ratingReviewService;

    @PostMapping("addRatingReview")
    public ResponseEntity<?> addRatingReview(@RequestBody RatingReview ratingReview){
        try {
            ratingReview.setRatingId(ratingReview.customerId+ratingReview.productId);

            RatingReview ratingReview1= ratingReviewService.addRatingReview(ratingReview);
            return new ResponseEntity<RatingReview>(ratingReview1, HttpStatus.CREATED);
        } catch (CustomerRatingReviewAlreadyExists e) {
            return new ResponseEntity<String>("Your rating had been already added", HttpStatus.CONFLICT);

        }
    }

    @GetMapping("allRatingReview")
    public ResponseEntity<?> getAllRatingReviews(){
        List<RatingReview> ratingReviewList = ratingReviewService.getAllRatingReviews();
        return new  ResponseEntity<List>(ratingReviewList,HttpStatus.OK);
    }
    @DeleteMapping("deleteRatingReview/{ratingId}")
    public ResponseEntity<?> deleteRatingReview(@PathVariable String ratingId){
        ratingReviewService.deleteRatingReviewByRatingId(ratingId);
        return new ResponseEntity<>("Successfully Deleted Review",HttpStatus.OK);
    }


    @GetMapping("viewByProductId/{productId}")
    public ResponseEntity<?> viewByProductId(@PathVariable String productId){
        List<RatingReview> list=ratingReviewService.getRatingReviewByProductId(productId);
        return new ResponseEntity<List>(list, HttpStatus.OK);
    }
    @PutMapping("updateRatingReview/{ratingId}")
    public ResponseEntity < ? > updateRatingReview(@PathVariable String ratingId, @RequestBody RatingReview ratingReview)  {
        RatingReview ratingReview1 = ratingReviewService.updateByRatingId(ratingId,ratingReview);
        return new ResponseEntity<>("Updated Your Review Successfully",HttpStatus.OK);
    }
//
//    @DeleteMapping("/employees/{id}")
//    public Map < String, Boolean > deleteEmployee(@PathVariable(value = "id") Long employeeId)
//            throws ResourceNotFoundException {
//        Employee employee = employeeRepository.findById(employeeId)
//                .orElseThrow(() - > new ResourceNotFoundException("Employee not found for this id :: " + employeeId));
//
//        employeeRepository.delete(employee);
//        Map < String, Boolean > response = new HashMap < > ();
//        response.put("deleted", Boolean.TRUE);
//        return response;
//    }
}
