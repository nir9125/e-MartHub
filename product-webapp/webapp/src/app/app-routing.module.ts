import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{PaymentComponent} from './payment/payment.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductDetailComponentComponent } from './components/product-detail-component/product-detail-component.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { AddProductComponent } from './seller/add-product/add-product.component';
import { ProductsOfSellerComponent } from './seller/products-of-seller/products-of-seller.component';
import { ProuductListComponent } from './components/prouduct-list/prouduct-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'customerDashboard', component: CustomerDashboardComponent},
  {path: 'sellerDashboard', component: AddProductComponent},
  {path: 'userProfile', component: UserProfileComponent},
  {path: 'productdet/:id', component: ProductDetailComponentComponent},
  {path: 'mycart', component: MycartComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'productList', component: ProuductListComponent},
  {path:'productsOfSeller', component:ProductsOfSellerComponent},
  {path:'orderHistory', component:OrderHistoryComponent},
  {path: 'navbar', component: NavbarComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
