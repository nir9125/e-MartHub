import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MycartService {

  constructor(private http:HttpClient) { }
  cartItems: any[] = [];
  

  addToCart(item: any) {
    // this.cartItems.push(item);
    return this.http.post('http://localhost:8086/cart/addCart', item);
  }

  getCartItems(mail: any) {
    console.log("hii get cart items" + mail)
    return this.http.get(`http://localhost:8086/cart/viewProductsByEmailId/${mail}`)
  }

  isItemInCart(item: any): boolean {
    return this.cartItems.some(cartItem => cartItem.name === item.name);
  }

  deleteFromCartbyProductId(emailId: string, productId : string){
    console.log("succeessfully deleted");
    return this.http.delete(`http://localhost:8086/cart/deleteByProductId/${emailId}/${productId}`)
    
  }

  deleteCartByEmailId(emailId: string){
    return this.http.delete(`http://localhost:8086/cart/deletebyEmailId/${emailId}`)
  }
}
