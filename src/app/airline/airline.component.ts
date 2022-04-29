import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Airline } from '../models/airline/airline';
import { AirlineService } from '../services/airline/airline.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {
  airline:Airline;
  airlineData :any=[];
  airlineName?:string;
  contactNumber?:string;
  isBlocked?:boolean;
  airlineID?:any;
  address?:string;
  searchString?:string;
  isActiveSeacrh?:string="Active";
  display ="none";
  constructor(private airlineService: AirlineService,private authService: AuthService) {
    this.airline = new Airline();
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  clearTxt(){
    this.searchString ="";
    this.isActiveSeacrh="Active";
  }
   ngOnInit(): void {
    this.loadAirlines();
   }
   loadAirlines(){
     if(this.searchString == undefined){
      this.searchString = "";
     }
    this.airlineService.getAllAirlines(this.searchString,this.isActiveSeacrh).subscribe(res =>{
      this.airlineData = res; 
     });
   }
   getAirline(airlineID:any){
    this.airlineService.getAirlineDetail(airlineID).subscribe(res =>{
        this.openModal();
        this.airlineID = res.airlineID;
        this.airlineName = res.airlineName;
        this.contactNumber = res.contactNumber;
        this.address = res.address;
        this.isBlocked = res.isBlocked;
     });
   }
   saveAirlines() {
    if(this.airline.airlineID){
     this.airline.airlineID = null;
    }
    if(this.airlineName == null || this.airlineName == ""){
      this.authService.showMessage('','Please enter Airline Name','warning');
    }
    else if(this.contactNumber == null){
      this.authService.showMessage('','Please enter Contact Number','warning');
    }
    else if(this.address == null || this.address == ""){
      this.authService.showMessage('','Please enter Address','warning');
    }
    else{
      this.airline.airlineID = this.airlineID;
    this.airline.airlineName = this.airlineName;
    this.airline.contactNumber= this.contactNumber;
    this.airline.isBlocked =  this.isBlocked;
    this.airline.address = this.address;
    this.airlineService.saveAirline(this.airline).subscribe(res =>
    {  
      this.authService.showMessage('','Airline successfully saved!','success');
      this.loadAirlines();
      this.onCloseHandled();
    });
}
   }
}
