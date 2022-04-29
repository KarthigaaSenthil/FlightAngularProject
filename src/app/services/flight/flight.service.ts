import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airline } from '../../models/airline/airline';
import { Flight } from '../../models/flight/flight';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Booking } from 'src/app/models/booking/booking';
import { Bookings } from 'src/app/booking';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  baseUrl = environment.baseUrl;
  constructor(private authService: AuthService, private httpClient : HttpClient) { }
  isActive = true;
  getAllFlights(searchString?:string,isActiveSeacrh?:string,airlineId?:any) : Observable<Flight[]>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let url=this.baseUrl + '/api/Flight/GetFlightList?IsActive='+ isActiveSeacrh +'&searchString='+searchString;
    if(airlineId){
      url+='&airlineId='+airlineId;
    }
    return this.httpClient.get<Flight[]>(url, { headers: headers }); 
  }
  getAllSeats(flightID?:any, returnFlightID?:any, scheduleID?:any, returnScheduleID?:any) : Observable<Bookings>{
    let url = this.baseUrl + '/api/Flight/GetSeats?flightID='+flightID+'&scheduleID='+scheduleID;
    if(returnFlightID){
      url += '&returnFlightID='+returnFlightID;
    }
    if(returnScheduleID){
      url += '&returnScheduleID='+returnScheduleID;
    }
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Bookings>(url, { headers: headers}); 
  }
  getFlightDetail(flightID: any) : Observable<Flight>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.baseUrl + '/api/Flight/GetFlight?FlightID='+ flightID, { headers: headers });
  }
  saveFlight(flight :Flight): Observable<Flight>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(this.baseUrl + '/api/Flight/PostFlight', flight, { headers: headers }); 
  }
}
