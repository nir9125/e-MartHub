import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentCustomerRatingService } from 'src/app/services/current-customer-rating.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent {
  // @Input() inputProperty: any; 
  rating: number = 0;
  review: string = '';
  custometId : string = '';
  productId : string = '';
  @Output() submitClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private snackBar: MatSnackBar, private ratingService: CurrentCustomerRatingService, private reviewService : ReviewService) {
    // console.log(this.inputProperty)\
   }
   

  updateRating(rating: number, starRating : any): void {
    this.rating = rating;
    starRating.rate(this.rating)
  }

  submit(ratingForm : NgForm, starRating :any): void {
    const ratingAndReview = {
       rating: this.rating, 
       review: this.review,
      customerId: localStorage.getItem('smail'),
      productId: localStorage.getItem('PID')
      
       };
    console.log("hi");
    console.log(ratingAndReview);
    // var ratingJson = JSON.stringify(ratingAndReview);
    // localStorage.setItem('raR', ratingJson)

    this.reviewService.addReview(ratingAndReview).subscribe(resp=>{
      console.log("review submitted successuflly"+resp);
    })

    
  
   
  
    this.ratingService.submitRatingAndReview(ratingAndReview)
      .subscribe((response) => {
        console.log(response);
        
        this.rating = 0;
        this.review = ''; 
        
      }, error => {
        console.log();
        
        console.error('Error submitting rating and review:', error);
      });
      
      ratingForm.resetForm();
      starRating.rate(0)
            
  }

  showAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 500, // Duration in milliseconds
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }

  onClick():void{
    this.showAlert('Review Submitted successfully');
    this.submitClicked.emit();

  }
}
