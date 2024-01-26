import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { RegistrationComponent } from './registration/registration.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import {PaymentComponent} from './payment/payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDetailComponentComponent } from './components/product-detail-component/product-detail-component.component';
import { SimilarProductsComponent } from 'src/app/components/similar-products/similar-products.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { RatingFormComponent } from 'src/app/components/rating-form/rating-form.component';
import { CustomerReviewShowComponent } from './components/customer-review-show/customer-review-show.component';
import { AddProductComponent } from './seller/add-product/add-product.component';
import { ProductsOfSellerComponent } from './seller/products-of-seller/products-of-seller.component';
import { ProuductListComponent } from './components/prouduct-list/prouduct-list.component';
import {MatSelectModule} from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    PaymentComponent,
    CustomerDashboardComponent,
    UserProfileComponent,
    AddProductComponent,
    ProductDetailComponentComponent,
    SimilarProductsComponent,
    MycartComponent,
    StarRatingComponent,
    RatingFormComponent,
    CustomerReviewShowComponent,
    ProductsOfSellerComponent,
    ProuductListComponent,
    OrderHistoryComponent,
    NavbarComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    // NgxPaginationModule,
    MatDialogModule, 
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    MatInputModule,
    MatSnackBarModule,
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
