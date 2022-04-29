import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/booking/booking';
import { Passengerdetails } from 'src/app/models/passengerdetails/passengerdetails';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
baseUrl = environment.baseUrl;
  constructor(private authService: AuthService,private httpClient: HttpClient) { }
  getAllBookings(searchString?:string) : Observable<any[]>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any[]>(this.baseUrl + '/api/Booking/GetBookingList?searchString='+searchString, { headers: headers}); 
  }
  getAllPassengerDetails(pnrID:any) : Observable<any[]>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any[]>(this.baseUrl + '/api/Booking/GetPassengerList?pnrId='+pnrID, { headers: headers}); 
  }
  saveBooking(booking :Booking):Observable<Booking>{
    let token=this.authService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<Booking>(this.baseUrl + '/api/Booking/CreateBooking', booking, { headers: headers}); 
  }
  cancelPassenger(passengerId :any):Observable<any>{
    let token=this.authService.getUserToken();
    console.log(token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(this.baseUrl + '/api/Booking/CancelPassenger?passengerID='+passengerId, null,{ headers: headers}); 
  }
}
