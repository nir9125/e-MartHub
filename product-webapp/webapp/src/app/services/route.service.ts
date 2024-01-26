import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient, private route: Router) {

   }

   routeToLogin(){
    this.route.navigate(['login']);
   }

   routeToCustomerDashboard(){
    console.log("This is Customer Dashboard");
   }
   routeToSellerDashboard(){
    console.log("This is Seller Dashboard");
   }

   routeToProductpage(){
    this.route.navigate(['product'])
   }
   
   routeToProductDetailPage(productId: string){
    this.route.navigate(['/product', productId]);
   }


}
