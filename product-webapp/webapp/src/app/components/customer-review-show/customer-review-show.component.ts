import { Component,OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
//import { RatingReviewsComponent } from '../rating-reviews/rating-reviews.component';

@Component({
  selector: 'app-customer-review-show',
  templateUrl: './customer-review-show.component.html',
  styleUrls: ['./customer-review-show.component.css']
})
export class CustomerReviewShowComponent implements OnInit {
  reviews: any[] = [];
  productId: string | undefined;
  userDetails: any
  name: any

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute, private authService: AuthService,
  ) {
    let details = localStorage.getItem('smail');
    this.authService.getUserDetails(details).subscribe(resp => {
      this.userDetails = resp;
      console.log(resp);
    })


  }
  Product_id : any
 ngOnInit(): void {
     
 
  this.route.params.subscribe(params => {
    const productId = params['id'];
    console.log('Product ID: this is on customer review show', productId); 
     this.Product_id=productId;//params.get("Himalya_Neem_Facewash");
    this.loadReviews();
  // this.route.paramMap.subscribe(params => {
  //   this.productId = productId;//params.get("Himalya_Neem_Facewash");
  //   this.loadReviews();
  // });
    localStorage.setItem('productId', this.Product_id);
    
  
});}
loadReviews(): void {
  console.log("Product Id is"+this.Product_id)
  this.reviewService.getReviewsByProductId(this.Product_id).subscribe((data : any) => {
    this.reviews = data;
    console.log("Getting reviews from product Id"+this.reviews)
    console.log("this is load reviews",this.Product_id);
    const customerIds = data.map((item: { customerId: any; }) => item.customerId);
    console.log(customerIds);
    // for(let i=0; i<customerIds.length; i++){
    //   this.authService.getUserDetails(customerIds[i]).subscribe(resp => {
    //     this.name = resp.firstName
    //   })
    // }
    
  });
}
}