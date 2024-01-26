import { Component } from '@angular/core';
import { SimilarProductJsonDataService } from 'src/app/services/similar-product-json-data.service';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent {

  similar_products: any[] | undefined; // You can use a more specific type if needed

  constructor(private similarProductJsonDataService: SimilarProductJsonDataService) {}

  ngOnInit() {
    this.similarProductJsonDataService.getSimilarProducts().subscribe(data => {
      this.similar_products = data;
    });
  }

}
