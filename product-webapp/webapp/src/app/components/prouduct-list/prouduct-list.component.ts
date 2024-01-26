import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Product } from 'src/app/model/productDetails';
import { ProductService } from 'src/app/services/product.service';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-prouduct-list',
  templateUrl: './prouduct-list.component.html',
  styleUrls: ['./prouduct-list.component.css']
})
export class ProuductListComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  products: Array<any>=[]; // Defining the places property here
  dis: any


  constructor(private dialog: MatDialog, private patientService: ProductService,private breakpointObserver : BreakpointObserver, private router: Router ) {
    this.patientService.getAllProduct(localStorage.getItem('item')).subscribe(data => {
      this.products = data; 
      // Use the Place model
      console.log(this.products)
    this.products=this.products.reverse();
      console.log(this.products)
      data.forEach((element: any)=>{
        this.products.push(element)
        console.log(this.products);
        for(var i=0; i<(this.products.length); i++){
          
          this.products[i].image = 'data:image/jpeg;base64,'+this.products[i].productImage;
          this.dis = (((this.products[i].price) - (this.products[i].sellingPrice))/(this.products[i].price))*100;
          this.products[i].discountedPercentage = Math.floor(this.dis);
        }
      })
     
       
    })
  }
  

  ngOnInit(): void {
    this.fetchAndStorePlaces();
  }

  fetchAndStorePlaces(): void {
    this.patientService.getAllProduct(localStorage.getItem('item')).subscribe(data => {
        this.products = data; 
        // Use the Place model
        console.log(this.products)
        data.forEach((element: any)=>{
          // this.products.push(element)
          console.log(this.products);
          for(var i=0; i<(this.products.length); i++){
            
            this.products[i].image = 'data:image/jpeg;base64,'+this.products[i].productImage;
            this.dis = (((this.products[i].price) - (this.products[i].sellingPrice))/(this.products[i].price))*100;
            this.products[i].discountedPercentage = Math.floor(this.dis);
          }
        })
      });
  }

sortDirection = 'asc'; // Default sort direction
sortDirectionRating = "desc";
sortBy(criteria: string): void {
  if (criteria === 'srating') {
    // this.places.sort((a, b) => b.rating - a.rating);
    if (this.sortDirectionRating === 'asc') {
      this.products.sort((a, b) => a.rating - b.rating);
      this.sortDirectionRating = 'desc'; // Change to descending after ascending sort
    } else {
      this.products.sort((a, b) => b.rating - a.rating);
      this.sortDirectionRating = 'asc'; // Change to ascending after descending sort
    }
  } else if (criteria === 'sprice') {
    if (this.sortDirection === 'asc') {
      this.products.sort((a, b) => a.sellingPrice - b.sellingPrice);
      this.sortDirection = 'desc'; // Change to descending after ascending sort
    } else {
      this.products.sort((a, b) => b.sellingPrice - a.sellingPrice);
      this.sortDirection = 'asc'; // Change to ascending after descending sort
    }
  }
}

logout() {
  this.router.navigate(['/login']);
}


}
