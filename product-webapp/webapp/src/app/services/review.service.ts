import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:8082'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  getReviewsByProductId(productId: string): Observable<any> {
    console.log("Get reviews by product id" + productId)
    return this.http.get(`http://localhost:8082/customerRatingReview/viewByProductId/${productId}`);
  }

  addReview(review: any):Observable<any>{
    return this.http.post('http://localhost:8082/customerRatingReview/addRatingReview', review);
  }
}
