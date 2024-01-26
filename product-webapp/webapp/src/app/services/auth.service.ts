import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

   //registering the user and the data will be stored in database
   registerUser(registeruser:any):Observable<any>{
    return this.http.post('http://localhost:8080/user/register', registeruser)
  }


  //adding the address and the address will be stored in database
  addAddress(addaddress:any):Observable<any>{
    return this.http.post('http://localhost:8080/address/addaddress', addaddress);
  }

  getUserRole(mail: any){
    console.log(mail);
    return this.http.get(`http://localhost:8080/user/role/${mail}`, {responseType: 'text'});
  }


  //for autheticating the user
  authenticateUser(loginUser: any):Observable<any>{
    return this.http.post('http://localhost:8080/user/login', loginUser);
  }
  
  //token will be generated for successful login
  setBearerToken(token: string){
    sessionStorage.setItem('bearerToken', token);
  }

  //getting the token
  getBearerToken(){
    sessionStorage.getItem('bearerToken')
  }

  //checking whether the user is authenticated or not
  public isAuthenticated():boolean{
    const token = localStorage.getItem('bearerToken');
    return token !== null;
  }

  getUserDetails(mail: any):Observable<any>{
    return this.http.get(`http://localhost:8080/user/userdetails/${mail}`);
  }

  getAddressDetails(mail: any):Observable<any>{
    return this.http.get(`http://localhost:8080/address/a/${mail}`);
  }
}
