import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteService } from '../services/route.service';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const routeService = inject(RouteService);
      const role = Role;
      const userRole = '';

      let token = sessionStorage.getItem('bearerToken')
      let x = localStorage.getItem('r')
      if(!token || token == 'undefined'){
        routeService.routeToLogin()
        return false;
      }
      else{
        if(role.Customer){
          routeService.routeToCustomerDashboard;
        }
        else{
          routeService.routeToSellerDashboard
        }
        return true;
      }

      

    
  }
  
}
