import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discount } from 'src/app/models/discount/discount';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  baseUrl = environment.baseUrl;
  constructor(private authService: AuthService, private httpClient : HttpClient) { }
  getAllDiscounts(searchString?:string) : Observable<Discount[]>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Discount[]>(this.baseUrl + '/api/Discount/GetDiscountList?searchString='+ searchString, { headers: headers} ); 
  }
  getDiscountDetail(discountID: any) : Observable<Discount>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.baseUrl + '/api/Discount/GetDiscount?DiscountID='+ discountID, { headers: headers} );
  }
  saveDiscount(discount :Discount): Observable<Discount>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(this.baseUrl + '/api/Discount/PostDiscount', discount, { headers: headers} ); 
  }
} 
