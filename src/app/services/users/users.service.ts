import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/users/users';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
baseUrl = environment.baseUrl;
  constructor(private authService:AuthService, private httpClient : HttpClient) { }
  getAllUsers(searchString?:string,isActiveSearch?:string) : Observable<Users[]>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Users[]>(this.baseUrl + '/api/Users/GetUserList?IsActive='+isActiveSearch+'&searchString=' +searchString, { headers: headers }); 
  }
  getUserDetail(userID: any) : Observable<Users>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.baseUrl + '/api/Users/GetUser?UserID='+ userID, { headers: headers });
  }
  saveUser(user :Users): Observable<Users>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(this.baseUrl + '/api/Users/PostUser', user, { headers: headers }); 
  }
  registerUser(user :Users): Observable<Users>{
    return this.httpClient.post<any>(this.baseUrl + '/api/Users/PostRegister', user); 
  }
  getDashboardDetails() : Observable<any>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.baseUrl + '/api/Users/GetDashboardList', { headers: headers });
  }
} 
