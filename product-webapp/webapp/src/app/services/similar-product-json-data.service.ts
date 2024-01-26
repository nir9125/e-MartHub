import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimilarProductJsonDataService {

  constructor(private http : HttpClient) { }

  getSimilarProducts(): Observable<any>{
    return this.http.get('getProductsByCategory/{category}'+"cloth")
  }
}
