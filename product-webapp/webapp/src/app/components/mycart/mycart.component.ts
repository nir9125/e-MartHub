import { MycartService } from 'src/app/services/mycart.service';

import { Component } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { R3SelectorScopeMode } from '@angular/compiler';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent {
  totalPrice: any
  sumOfProductPrices: any
  emailId: any
producntCnt: any

  items: any[] = [
  //   { name: 'Item 1', price: 10, image: 'item1.jpg' },
  //   { name: 'Item 2', price: 15, image: 'item2.jpg' },
  //   { name: 'Item 3', price: 20, image: 'item3.jpg' },
  //   // Add more items as needed
  ];

  cart: any[] = [
  //   { name: 'Item 1', price: 10, image: 'item1.jpg' },
  //   { name: 'Item 2', price: 15, image: 'item2.jpg' },
  //   { name: 'Item 3', price: 20, image: 'item3.jpg' },
  //   { name: 'Item 1', price: 10, image: 'item1.jpg' },
  //   { name: 'Item 2', price: 15, image: 'item2.jpg' },
  //   { name: 'Item 3', price: 20, image: 'item3.jpg' },
  //   // You can add items to the temporary cart for testing
  ];
  products!: Array<Product> ;
  y:any
 

  constructor(private cartService: MycartService) {
    this.producntCnt=true

    let z = localStorage.getItem('smail')
    console.log('Hii' + z)
    this.y = 'eramya3997@gmail.com'
    if(z != null){
      this.y = z
    }
    this.cartService.getCartItems(this.y).subscribe(resp => {
      console.log("get cart")
      console.log(resp)
      this.products = [resp]
      // if(this.products.flat().length==0){
      //   this.producntCnt=false;
      //   console.log("productCnt"+this.producntCnt);
      // }
      // else{
      //   this.producntCnt=true;
      // }
      console.log(this.products.flat())
      // const singleList = this.products.flat();
      // console.log(singleList);
      for(var i=0; i<(this.products.flat().length); i++){
          
        this.products.flat()[i].productImage = 'data:image/jpeg;base64,'+this.products.flat()[i].productImage;
        // this.dis = (((this.products.flat().price) - (this.products.flat().sellingPrice))/(this.products[i].price))*100;
        // this.products[i].discountedPercentage = Math.floor(this.dis);
        // localStorage.setItem('im', this.products[i].image)
      }
      
    
   
    })
  //  this.updateTotal();
  }
 
  total: number = 0;
  sum: number= 0
  
  updateTotal(): number {
    // let sum = 0;
    // this.total = this.products.flat().reduce((sum, item) => 0);;
    this.sumOfProductPrices = this.products.flat().reduce((total, product) => {
      if (product.sellingPrice !== undefined) {
        return total + product.sellingPrice;
      }
      return total;
    }, 0);
    
    console.log(`Sum of product prices: ${this.sumOfProductPrices}`);
    localStorage.setItem('tPrice', this.sumOfProductPrices);
    return this.sumOfProductPrices;




  

  }

  
  removeFromCart(productId : string): void {
    let z = localStorage.getItem('smail')
    console.log('Hii' + z)
    this.y = 'eramya3997@gmail.com'
    if(z != null){
      this.y = z
    }
    this.cartService.deleteFromCartbyProductId(this.y, productId).subscribe(resp => {
      console.log(resp + 'Hii deleted from cart')
    })
    // this.products.splice(productId, 1);
    // this.updateTotal();
    window.location.reload();
  }
//   updateQuantity(index: number, newQuantity: number): void {
//     if (index >= 0 && index < this.cart.length && newQuantity >= 0) {
//       this.cart[index].quantity = newQuantity;
//       this.updateTotal();
//     }
//   }
//   updateTotalPrice(): number {
//     return this.cart.reduce((total, item) => total + item.price * item.itemQuantity, 0);
//   }

 
  
  // getTotalPrice(): number {
  //   this.totalPrice = this.cart.reduce((total, item) => total + item.price, 0);
  //   localStorage.setItem('tPrice', this.totalPrice);
  //   return this.totalPrice;

  // }
//   clearCart(): void {
//   this.cart = [];
// }
  
  checkout(): void {
    // Simulate a checkout process here (e.g., payment, order processing, etc.)
    // For this example, we'll simply clear the cart.
    
    
  }

  
  
}
