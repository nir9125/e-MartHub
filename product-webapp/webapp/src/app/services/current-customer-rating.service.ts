import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentCustomerRatingService {

  private backendUrl = 'http://localhost:8082/customerRatingReview/addRatingReview'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  submitRatingAndReview(ratingAndReview: any) {
    return this.http.post(this.backendUrl, ratingAndReview);
  }
}
