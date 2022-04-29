import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airline } from '../../models/airline/airline';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  isBlock = false;  
  baseUrl = environment.baseUrl;
  constructor(private authService:AuthService, private httpClient : HttpClient) { }
  getAllAirlines(searchString?:string,isActiveSeacrh?:string) : Observable<Airline[]>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Airline[]>(this.baseUrl + '/api/Airline/GetAirlineList?IsBlocked='+ isActiveSeacrh+'&searchString=' +searchString, { headers: headers }); 
  }
  getAirlineDetail(airlineID: any) : Observable<Airline>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.baseUrl + '/api/Airline/GetAirline?AirlineID='+ airlineID, { headers: headers });
  }
  saveAirline(airline :Airline): Observable<Airline>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(this.baseUrl + '/api/Airline/PostAirline', airline, { headers: headers }); 
  }
}
