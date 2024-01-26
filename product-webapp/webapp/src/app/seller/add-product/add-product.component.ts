import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Product } from 'src/app/model/Product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html', // Update this with your actual template URL
  styleUrls: ['./add-product.component.css'] // Update this with your actual styles URL
})
export class AddProductComponent{

  product: any = {};
  productList: any[] = [];
  selectedImage: File | null = null;
  @Output() submitClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private snackBar: MatSnackBar,private productService: ProductService) {
    
   }

  ngOnInit(): void {
    this.fetchProducts();
  }
  fetchProducts() {
    let m = localStorage.getItem('smail')
    this.productService.getProductsBySellerMailId(m).subscribe(
      (response) => {
        this.productList = response;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.selectedImage || ''); // Append the selected image file if available
    formData.append('product', JSON.stringify(this.product)); // Append the other form data as JSON

    this.productService.addProduct(formData).subscribe(
      (response) => {
        console.log('Product added successfully', response);
        this.product = {};
        this.selectedImage = null;
      },
      (error) => {
        console.error('Error adding product', error);
      }
    );

      let m = localStorage.getItem('smail')
      console.log(m);
    this.productService.getProductsBySellerMailId(m).subscribe(
      (response) => {
        console.log(response)
        this.productList = response;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );

    window.location.reload();
  }

  onImageChange(event: any) {
    this.selectedImage = event.target.files[0];
  }

  isDialogOpen = false;

  openCreateDialog(): void {
    this.isDialogOpen = true;
  }

  deleteProduct(x: string){
    console.log(x)
    this.productService.deleteProductById(x).subscribe(resp => {
      console.log(resp)
      if (resp) {
        // Perform actions if the response is true (successful deletion)
        console.log('Product deleted successfully.');
        // You can put any additional actions here
      } else {
        console.log('Deletion failed.'); // Handle deletion failure if needed
      }

    })
  }

  showAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }

  productDelete():void{
    this.showAlert("Product Deleted")
    this.submitClicked.emit();
      window.location.reload();
  }
 


}
