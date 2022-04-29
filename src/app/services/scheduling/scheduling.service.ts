import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scheduling } from 'src/app/models/scheduling/scheduling';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {
  baseUrl = environment.baseUrl;
  constructor(private authService: AuthService, private httpClient : HttpClient) { }
  getAllAvailableFlights(tripDate?:Date, Source?:string, Destination?:string, type?:string, returnDate?:Date|null) : Observable<Scheduling[]>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let url=this.baseUrl + '/api/Booking/GetAvailableAirlines?Source='+Source+'&Destination='+Destination;
    if(tripDate){
      url+='&tripDate='+tripDate;
    }
    if(returnDate){
      url+='&returnDate='+returnDate;
    }
    return this.httpClient.get<Scheduling[]>(url + '&type='+type, { headers: headers }); 
  }
  getAllSchedulings(searchString?:string) : Observable<Scheduling[]>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.httpClient.get<Scheduling[]>(this.baseUrl + '/api/Booking/GetScheduleList?FlightNo='+searchString, { headers: headers }); 
  }
  getScheduleDetail(schedulingID: any) : Observable<Scheduling>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.baseUrl + '/api/Booking/GetSchedule?scheduleID='+ schedulingID, { headers: headers });
  }
  saveSchedule(schedule :Scheduling): Observable<Scheduling>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(this.baseUrl + '/api/Booking/PostSchedule', schedule, { headers: headers }); 
  }
}