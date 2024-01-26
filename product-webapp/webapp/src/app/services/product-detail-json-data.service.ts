import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailJsonDataService {

  jsonData : any[] | undefined ;
  constructor(private http: HttpClient) {}

  getProducts(productId : string): Observable<any> {
    console.log("1"+productId);
    
    return this.http.get<any>('http://localhost:8087/product/viewByproductId/${productId}');

  }
}
