import { Component, OnInit } from '@angular/core';
import { Flight } from '../models/flight/flight';
import { AirlineService } from '../services/airline/airline.service';
import { AuthService } from '../services/auth/auth.service';
import { FlightService } from '../services/flight/flight.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  airlineData :any=[];
  flightData :any=[];
  flight: Flight;
  flightID?: any;
  flightNumber? :string;
  airlineID?:any;
  instrumentUsed?:string;
  totalSeats? :number;
  totalBusinessSeats?:number;
  totalNonBusinessSeats?:number;
  isActive?:boolean = true;
  searchString?:string;
  isActiveSeacrh?:string="Active";
  display ="none";
  constructor(private flightService: FlightService, private airlineService: AirlineService, private authService:AuthService) {
    this.flight = new Flight();
   }
   openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  ngOnInit(): void {
    this.airlineService.getAllAirlines("","Active").subscribe(res =>{ 
     this.airlineData = res; });
     this.loadFlights();
  }
  clearTxt(){
    this.searchString ="";
    this.isActiveSeacrh="Active";
  }
  loadFlights(){
    if(this.searchString == undefined){
      this.searchString="";
     }
    this.flightService.getAllFlights(this.searchString,this.isActiveSeacrh).subscribe(res =>{
      this.flightData = res; 
     });
   }
   getFlight(flightID:any){
    this.flightService.getFlightDetail(flightID).subscribe(res =>{
        this.openModal();
        this.flightID = res.flightID;
        this.flightNumber = res.flightNumber;
        this.airlineID = res.airlineID;
        this.instrumentUsed = res.instrumentUsed;
        this.totalSeats = res.totalSeats;
        this.totalBusinessSeats = res.totalBusinessSeats;
        this.totalNonBusinessSeats = res.totalNonBusinessSeats;
        this.isActive = res.isActive;
     });
   }
   saveFlights() {
    if(this.flight.flightID){
     this.flight.flightID = null;
    }
    if(this.flightNumber == null || this.flightNumber == ""){
      this.authService.showMessage('','Please enter Flight Number','warning');
    }
    else if(this.airlineID == null || this.airlineID == "Select Airline" || this.airlineID == undefined){
      this.authService.showMessage('','Please select Airline','warning');
    }
    else if(this.totalSeats == null || this.totalSeats == undefined){
      this.authService.showMessage('','Please enter Total Seats','warning');
    }
    else if(this.totalBusinessSeats == null || this.totalBusinessSeats == undefined){
      this.authService.showMessage('','Please enter Total Business Seats','warning');
    }
    else if(this.totalNonBusinessSeats == null || this.totalNonBusinessSeats == undefined){
      this.authService.showMessage('','Please enter Total Non-business Seats','warning');
    }
    else{
      this.flight.flightID = this.flightID;
      this.flight.airlineID = this.airlineID;
      this.flight.flightNumber = this.flightNumber;
      this.flight.instrumentUsed= this.instrumentUsed;
      this.flight.totalSeats =  this.totalSeats;
      this.flight.totalBusinessSeats = this.totalBusinessSeats;
      this.flight.totalNonBusinessSeats = this.totalNonBusinessSeats;
      this.flight.isActive = this.isActive;
      this.flightService.saveFlight(this.flight).subscribe(res =>
    {  
      this.authService.showMessage('','Flight successfully saved!','success');
      this.loadFlights();
      this.onCloseHandled();
    });
}
   }
}
