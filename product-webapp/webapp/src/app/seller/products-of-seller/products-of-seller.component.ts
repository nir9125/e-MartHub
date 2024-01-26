import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-of-seller',
  templateUrl: './products-of-seller.component.html',
  styleUrls: ['./products-of-seller.component.css']
})
export class ProductsOfSellerComponent {
  productList: Product[] = [];
  sellermail= localStorage.getItem('smail');

  addProduct(
    newproductName: string,
    productCategory: string,
    productSubCategory: string,
    productBrand: string,
    //productDesc: string,
    price: number,
    // productImage: any,
    stockQuantity: number,
    rating: number,
    sellingPrice: number,
  ) {
    const newProduct: Product = {
      productName: newproductName,
      productCategory: productCategory,
      productSubCategory: productSubCategory,
      stockQuantity: stockQuantity,
      // date: new Date().toLocaleDateString(),
      // time: new Date().toLocaleTimeString(),
      productBrand: productBrand,
      // rating: rating,
      price: price,
      sellingPrice: sellingPrice,
    };
    this.productService.addProduct(newProduct);
  }


  productForm = new FormGroup({
    //productId: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    productCategory: new FormControl('', Validators.required),
    productSubCategory: new FormControl('', Validators.required),
    productBrand: new FormControl('', Validators.required),
    productDesc: new FormControl('', Validators.required),
    //discount: new FormControl('', Validators.pattern(/^\d*\.?\d{0,2}$/)),
    price: new FormControl('', Validators.pattern(/^\d+(\.\d{1,2})?$/)),
    productImage: new FormControl('', Validators.required),
    stockQuantity: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    sellingPrice: new FormControl('', Validators.required),
    sellerEmailId: new FormControl(''),
  });

  selectedFile: any;

  product: any;
  productImage: any;
  products: any[] = [];
  tempProduct: any[] = [];

  myfile(data: any) {
    this.selectedFile = data.target.files[0];
  }

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.fetchProducts();
    let sellermail = localStorage.getItem('smail')
    this.productService.getProductsBySellerMailId(sellermail).subscribe(resp => {
      console.log(resp)
      this.products = resp
    })
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

  postProduct() {
    this.product = {
      //productId: this.productForm.value.productId,
      productName: this.productForm.value.productName,
      productCategory: this.productForm.value.productCategory,
      productSubCategory: this.productForm.value.productSubCategory,
      // productPrice: this.productForm.value.price,
      productBrand: this.productForm.value.productBrand,
      productDesc: this.productForm.value.productDesc,
      //discount: this.productForm.value.discount,
      // stockQuantity: this.createProductForm.value.stockQuantity,
      price: this.productForm.value.price,
      rating: this.productForm.value.rating,
      stockQuantity: this.productForm.value.stockQuantity,
      sellingPrice: this.productForm.value.sellingPrice,
      sellerEmailId: this.sellermail,      
      //sellingPrice: this.createProductForm.value.sellingPrice,
    };
    this.productImage = {
      file: this.selectedFile,
    };
    console.log(this.product);
    console.log(this.product.productName);
  }

  onProductSave(val: FormGroup) {
    // if (this.productForm.valid) {
    //   const productData = this.productForm.value;
    //   console.log('Product data:', productData);
    //   // Perform your save operation or API call here
    // }
    // console.log(val.value);
    // this.productList = val.value;
    // console.log(this.selectedFile);
    // console.log(this.productForm.value);
    this.postProduct();
    var formData = new FormData(); //instance for class
    formData.append('file', this.selectedFile);
    formData.append('product', JSON.stringify(this.product));
    this.sellermail= localStorage.getItem('smail')
    //formData.append('sellerEmailId', this.sellermail);
    this.productService.addProduct(formData).subscribe(
      (response) => {
        console.log(response);
        // this.productService.createProduct(response);
        //this.isSuccessPopupVisible = true;
        this.products.push(response);
        // this.productForm.reset();
        // this.productService.getAllProduct().

        // let sellerMail = localStorage.getItem('smail')
        // this.productService.getProductsBySellerMailId(sellerMail).subscribe(resp => {
        //   console.log(resp)
        //   this.products = resp
        // })
        this.fetchProducts()
      },
    );

  }

  isDialogOpen = false;

  openCreateDialog(): void {
    this.isDialogOpen = true;
  }



  // getProducts(): any[] {
  //   return this.productService.getProducts();
  // }

  searchString: string = ''; // Initialize an empty string for search

  filterProducts(): any[] {
    return this.products.filter(product =>
      product.productName.toLowerCase().includes(this.searchString.toLowerCase()) ||
      product.productCategory.toLowerCase().includes(this.searchString.toLowerCase()) ||
      product.productSubCategory.toLowerCase().includes(this.searchString.toLowerCase()) ||
      product.productBrand.toLowerCase().includes(this.searchString.toLowerCase())
    );
  }

}
