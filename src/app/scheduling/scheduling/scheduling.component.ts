import { Component, OnInit } from '@angular/core';
import { Scheduling } from 'src/app/models/scheduling/scheduling';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {
  airlineData :any=[];
  schedulingData:any=[];
  flightData :any=[];
  scheduling: Scheduling;
  flightID?: any;
  airlineID?:any;
  scheduleID?:any;
  airlineName?:string;
  flightNumber?:string;
  arrivalTime?:Date;
  depatureTime?:Date;
  source?:string;
  destination?:string;
  ticketCostForBusiness?:number;
  ticketCostForNonBusiness?:number;
  mealPreference?:string;
  scheduledDays?:string="WeekDays";
  searchString?:string;
  display ="none";
  constructor(private flightService: FlightService, private airlineService: AirlineService, private schedulingService: SchedulingService, private authService:AuthService) {
    this.scheduling = new Scheduling();
   }
   openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  clearTxt(){
    this.searchString ="";
  }
  ngOnInit(): void {
    this.airlineService.getAllAirlines("","Active").subscribe(res =>{ 
      this.airlineData = res; });
      this.flightService.getAllFlights("","Active").subscribe(res =>{ 
        this.flightData = res; });
      this.loadSchedulings();
  }
  loadSchedulings(){
    if(this.searchString == undefined){
      this.searchString="";
    }
    this.schedulingService.getAllSchedulings(this.searchString).subscribe(res =>{
      this.schedulingData = res; 
     });
   }
   lodFlightt(){
    this.flightService.getAllFlights("","Active",this.airlineID).subscribe(res =>{ 
      this.flightData = res; });
   }
   getSchedule(schedulingID:any){
    this.schedulingService.getScheduleDetail(schedulingID).subscribe(res =>{
        this.openModal();
        this.scheduleID = res.scheduleID;
        this.flightID = res.flightID;
        this.flightNumber = res.flightNumber;
        this.airlineID = res.airlineID;
        this.airlineName = res.airlineName;
        this.arrivalTime = res.arrivalTime;
        this.depatureTime = res.depatureTime;
        this.source = res.source;
        this.destination = res.destination;
        this.ticketCostForBusiness= res.ticketCostForBusiness;
        this.ticketCostForNonBusiness = res.ticketCostForNonBusiness;
        this.mealPreference= res.mealPreference;
        this.scheduledDays= res.scheduledDays;
     });
   }
   saveSchedule() {
    if(this.scheduleID == undefined){
     this.scheduleID = null;
    }
    if(this.airlineID == null || this.airlineID == undefined || this.airlineID == "Select Airline"){
      this.authService.showMessage('','Please select Airline','warning');
    }
    else if(this.flightID == null || this.flightID == undefined || this.flightID == "Select Flight"){
      this.authService.showMessage('','Please enter Flight Number','warning');
    }
    else if(this.arrivalTime == null || this.arrivalTime == undefined){
      this.authService.showMessage('','Please enter Arrival Time','warning');
    }
    else if(this.depatureTime == null || this.depatureTime == undefined){
      this.authService.showMessage('','Please enter Depature Time','warning');
    }
    else if(this.source == null || this.source == undefined){
      this.authService.showMessage('','Please enter Source','warning');
    }
    else if(this.destination == null || this.destination == undefined){
      this.authService.showMessage('','Please enter Destination','warning');
    }
    else{
      this.scheduling.scheduleID = this.scheduleID;
      this.scheduling.flightID = this.flightID;
      this.scheduling.airlineID = this.airlineID;
      this.scheduling.arrivalTime = this.arrivalTime;
      this.scheduling.depatureTime= this.depatureTime;
      this.scheduling.source =  this.source;
      this.scheduling.destination = this.destination;
      this.scheduling.ticketCostForBusiness = this.ticketCostForBusiness;
      this.scheduling.ticketCostForNonBusiness = this.ticketCostForNonBusiness;
      this.scheduling.mealPreference = this.mealPreference;
      this.scheduling.scheduledDays = this.scheduledDays;
      this.schedulingService.saveSchedule(this.scheduling).subscribe(res =>
    {  
      this.authService.showMessage('','Scheduling successfully saved!','success');
      this.loadSchedulings();
      this.onCloseHandled();
    });
}
   }
}
