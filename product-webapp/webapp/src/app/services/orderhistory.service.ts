import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderhistoryService {


  // getProductsBySellerMailId(m: string | null) {
  //   throw new Error('Method not implemented.');
  // }



  private dataUrl = 'http://localhost:8086/order/viewProductsByEmailId/'; // Path to your JSON file

  constructor(private http: HttpClient) { }


  getProducts(mail: any): Observable<any[]> {
    console.log("this is working");
    
    return this.http.get<any[]>(`http://localhost:8086/order/viewProductsByEmailId/${mail}`);
  }
  addProducts(cart: any): Observable<any[]> {
    console.log("this is working");
    console.log(cart)
    
    return this.http.post<any[]>('http://localhost:8086/order/add', cart);
  }
}
