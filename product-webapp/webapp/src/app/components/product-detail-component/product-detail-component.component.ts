import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ChangeDetectorRef} from '@angular/core'
import { ChangeDetectionStrategy } from '@angular/compiler';
import { MycartService } from 'src/app/services/mycart.service';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from 'src/app/model/Cart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.css']
})
export class ProductDetailComponentComponent implements OnInit {
  isAddedToCart = false; 
  // product : any [];
  product2 : any;
  product3: Array<any>=[]
  dis: any
  cart: Cart;
  y: string= '';
  reviews: any[] = [];
  userDetails: any
  cartAnimationState: string;
  @Output() submitClicked: EventEmitter<void> = new EventEmitter<void>();
 // productName = "free fall"
  // productPrice = document.getElementById("productPrice") as HTMLInputElement;
  //  productName = document.getElementById("productName") as HTMLInputElement;
  constructor(private snackBar: MatSnackBar,private authService:AuthService,private productService : ProductService,private router : Router,private cartService : MycartService, private route2 : ActivatedRoute, private reviewService: ReviewService){
    this.cartAnimationState = '';
    this.cart = new Cart();
    let category = localStorage.getItem('item');
    this.productService.getAllProduct(category).subscribe(resp => {
      console.log(this.product3)
      resp.forEach((element: any)=>{
        this.product3.push(element)
        console.log(this.product3);
        for(var i=0; i<(this.product3.length); i++){
          
          this.product3[i].image = 'data:image/jpeg;base64,'+this.product3[i].productImage;
          this.dis = (((this.product3[i].price) - (this.product3[i].sellingPrice))/(this.product3[i].price))*100;
          this.product3[i].discountedPercentage = Math.floor(this.dis);
          localStorage.setItem('im', this.product3[i].image)
        }
        this.product3 = this.product3.slice(0, 4);
        console.log(this.product3)

        

    })
    
  })

  // let z = localStorage.getItem('pId')
  //   console.log('Hii' + z)
  //   this.y = 'eramya3997@gmail.com'
  //   if(z != null){
  //     this.y = z
  //     console.log("hii" + z)
  //   }


  // this.reviewService.getReviewsByProductId(this.product2.productId).subscribe(resp => {
  //   this.reviews = resp
  //   console.log(this.reviews)
  // })
  }

  ngOnInit(){
    console.log("ngonit")
    // this.productDetailJsonDataService.getProducts().subscribe(data=>
    //   {
    //     this.product = data
        
    //   });
      this.route2.params.subscribe(params => {
        const productId = params['id'];
        console.log('Product ID:', productId); 
        console.log("2"+productId);
        // Extract product ID from route parameter
        this.productService.viewByProductId(productId).subscribe((product: any) => {
          console.log("hi");
          console.log('Product Data:', product);
          this.product2 = product;
          
        console.log(this.product2.productId)

        this.reviewService.getReviewsByProductId(this.product2.productId).subscribe(resp => {
          this.reviews = resp
          console.log(resp)
        })
        console.log(localStorage.getItem('cId'))
        this.authService.getUserDetails(localStorage.getItem('cId')).subscribe(resp => {
        this.userDetails = resp;
        console.log(resp);
    })


        });
      });
      
    }
    getBase64ImageSrc(base64Data: string): string {
      return `data:image/jpeg;base64,${base64Data}`;
    }
    navigateToCart(){
      this.router.navigate(['/mycart']);
    }
    addToCart(product: any) {
      // const itemToAdd = {
      //   name : this.product2.productName,
      //   price : this.product2.price,
      //   image : this.getBase64ImageSrc(this.product2.productImage)
      // };
      // if (this.cartService.isItemInCart(itemToAdd)) {
      //   window.alert('This item is already in your cart.');
      // } else {
      //   this.cartService.addToCart(itemToAdd);
      // }
      // this.isAddedToCart = true;
    
    let z = localStorage.getItem('smail')
    console.log('Hii' + z)
    this.y = 'eramya3997@gmail.com'
       this.cart.emailId = this.y;
    if(z != null){
      this.cart.emailId = z
      console.log('Hello' + z)
    }
    // this.cart.emailId = this.y;
    // this.cart.emailId = localStorage.getItem('smail')
    console.log('Hii' + z);
    this.cart.products = [product]
    console.log(this.cart)
    this.cartAnimationState = 'added';
    setTimeout(() => {
      this.cartAnimationState = '';
    }, 400);
  

    this.cartService.addToCart(this.cart).subscribe(resp =>{
      
    })





    }

    showAlert(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
        verticalPosition: 'top', // 'top' | 'bottom'
      });
    }
  
    addToCartClick():void{
      this.showAlert('Product added to cart');
      this.submitClicked.emit();
  
    }


    
  } 
