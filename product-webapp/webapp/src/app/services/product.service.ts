import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any[] = [];
  private baseUrl = 'http://localhost:8111/product/add';

  constructor(private http: HttpClient) { }
  
  viewAllProduct(): Observable<any> {
    return this.http.get('http://localhost:8111/product/getProductsByCategory/Cloth');
  }
  getProductbyPrice(category: any): Observable<any> {
    return this.http.get(`http://localhost:8111/product/viewByProductCategoryOrderByPrice/${category}`);
  }
  getProductbyRating(category: any): Observable<any> {
    return this.http.get(`http://localhost:8111/product/viewByProductCategoryOrderByRating/${category}`);
  }
  getProductbyPriceDesc(category: any): Observable<any> {
    return this.http.get(`http://localhost:8111/product/viewByProductCategoryOrderByPriceDesc/${category}`);
  }
  getProductbyRatingDesc(category: any): Observable<any> {
    return this.http.get(`http://localhost:8111/product/viewByProductCategoryOrderByRatingDesc/${category}`);
  }

  getAllProduct(category: any): Observable<any> {
    return this.http.get(`http://localhost:8111/product/getProductsByCategory/${category}`);
  }


  addProduct(product: any){
    return this.http.post('http://localhost:8111/product/add', product);
  }
  getProductsBySellerMailId(mail: any): Observable<any> {
    return this.http.get(`http://localhost:8111/product/viewProductBySellerEmailId/${mail}`);
  }

  viewByProductId(proId: string):Observable<any>{
    console.log('3' + proId)
    return this.http.get(`http://localhost:8111/product/viewByproductId/${proId}`);
  }

  deleteProductById(productId: string):Observable<any>{
    return this.http.delete(`http://localhost:8111/product/deleteByProductId/${productId}`)
    console.log("delete"+productId)
  }
}
