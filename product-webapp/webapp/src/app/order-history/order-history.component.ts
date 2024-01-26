import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderhistoryService } from '../services/orderhistory.service';
import { MycartService } from '../services/mycart.service';
import { Product } from '../model/Product';
import { Cart } from '../model/Cart';
import { NgForm } from '@angular/forms';
import { ReviewService } from '../services/review.service';
import { CurrentCustomerRatingService } from '../services/current-customer-rating.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {
  
  products!: Array<Product> ; // Array to store fetched products
  y: any
  cart: Cart
  // rating: number = 0;
  review: string = '';
  custometId : string = '';
  productId : string = ''
  @Input() rating: number = 0;
  @Output() rated = new EventEmitter<number>();
  isPanelExpanded: boolean = false;

  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private orderHistoryService: OrderhistoryService, private cartService: MycartService, private ratingService: CurrentCustomerRatingService, private reviewService: ReviewService) {
    this.cart = new Cart();
    let z = localStorage.getItem('smail')
    console.log('Hii' + z)
    this.y = 'eramya3997@gmail.com'
    if(z != null){
      this.y = z
    }
    this.cart.emailId = this.y
    console.log(this.y)
    this.cartService.getCartItems(this.y).subscribe(resp => {
      console.log("get cart")
      console.log(resp)
      this.cart.products = [resp].flat();
      console.log(this.cart)

      this.orderHistoryService.addProducts(this.cart).subscribe(resp => {
        console.log("added in order history")
        console.log(resp);
        // this.products = [resp.products]
      })
      this.cartService.deleteCartByEmailId(this.y).subscribe(resp => {
        console.log("Products in cart deleted")
      })

      
      

    })
    console.log(this.cart)

      // this.orderHistoryService.addProducts(this.cart).subscribe(resp => {
      //   console.log("added in order history")
      //   console.log(resp);
        
      // })

      // // this.cartService.deleteCartByEmailId(this.y).subscribe(resp => {
      // //   console.log("Products in cart deleted")
      // // })

      this.orderHistoryService.getProducts(this.y).subscribe(resp => {
        this.products = resp
        console.log("Get products form order history"+ this.products)
      
        
      })   
    
  }

  ngOnInit(): void {
    
    // window.location.reload();
   

  }

  toggleExpansionPanel(): void {
   
  }

  fetchProducts(): void {

    let z = localStorage.getItem('smail')
    console.log('Hii' + z)
    this.y = 'eramya3997@gmail.com'
    if(z != null){
      this.y = z
      console.log("hii" + z)
    }
    
    this.orderHistoryService.getProducts(this.y).subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
  getBase64ImageSrc(base64Data: string): string {
    return `data:image/jpeg;base64,${base64Data}`;
  }

  getProductId(x: any){
    localStorage.setItem('proId', x)
    console.log(x)
    
  }
  getPid(x: any){
    localStorage.setItem('PID', x)
    console.log(x)
    
  }

  submit(ratingForm : NgForm, starRating :any): void {
    const ratingAndReview = {
       rating: this.rating, 
       review: this.review,
      //  customerId= "";
       customerId: localStorage.getItem('smail'),
        productId: localStorage.getItem('proId')
       
       };
    console.log(ratingAndReview);
    this.reviewService.addReview(ratingAndReview).subscribe(resp => {
      console.log(resp);
    })
  
    // this.ratingService.submitRatingAndReview(ratingAndReview)
    //   .subscribe((response) => {
    //     console.log(response);
        
    //     this.rating = 0;
    //     this.review = ''; 
        
    //   }, error => {
    //     console.log();
        
    //     console.error('Error submitting rating and review:', error);
    //   });
      
      ratingForm.resetForm();
      starRating.rate(0)
            
  }

 

  rate(rating: number): void {
    this.rating = rating;
    this.rated.emit(this.rating);
  }
  updateRating(rating: number, starRating : any): void {
    this.rating = rating;
    starRating.rate(this.rating)
  }
  closePanel(): void {
    // Close the expansion panel
    this.isPanelExpanded = false;
  }

}




