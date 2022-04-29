import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { ajax, css } from "jquery";
import { DiscountService } from 'src/app/services/discount/discount.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';
import { Booking } from 'src/app/models/booking/booking';
import { Passengerdetails } from 'src/app/models/passengerdetails/passengerdetails';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  tripType?:string = "OneWay";
  booking:Booking;
  passengerList?:any=[];
  flightData?:any=[];
  returnFlights ?:any[];
  discountData?:any=[];
  onwardSeats?:any[];
  returnSeats?:any[];
  onwardBSeats?:any[];
  returnBSeats?:any[];
  onwardNBSeats?:any[];
  returnNBSeats?:any[];
  pnrId?:any;
  flightID?:any;
  airlineID?:any;
  scheduleID?:any;
  returnFlightID?:any;
  returnAirlineID?:any;
  returnScheduleID?:any;
  trip?:string;
  onwardDate?:Date;
  returnDate?:Date| null;
  modeOfPayment="Online Payment";
  passengerDetails?:Passengerdetails[];
  discountID?:any;
  source?:string;
  destination?:string;
  displayPassenger ="none";
  displayDiscount="none";
  displayPriceTag="none";
  totalPricee:number=0;
  isDiscount:boolean = false;
  discountPrice = 0;
  name?:string;
  gender?:string;
  emailId?:string;
  onwardSeatNumber?:string;
  returnSeatNumber?:string;
  mealPreference?:string;
  seatType?:string;
  status?:string;
  age?:number;
  totalPrice?:number;
  count?:number=0;
  allocatedTrip?:any[];
  allocatedReturn?:any[];

  //Price list
  tripBusinessCost?:number;
  tripNonBusinessCost?:number;
  returnBusinessCost?:number;
  returnNonBusinessCost?:number;
  tripTotal:number=0;
  returnTotal:number =0;
  constructor(private router:Router, private flightService:FlightService, private discountService: DiscountService, private schedulingService: SchedulingService, private bookingService:BookingService, private authService:AuthService) {
    this.booking = new Booking();
   }
  ngOnInit(): void {
      this.discountService.getAllDiscounts("forBooking").subscribe(res =>{ 
        this.discountData = res; });
  }
  loadFlights(){
    if(this.returnDate == undefined){
      this.returnDate =null;
    }
    if(this.source != undefined && this.source != "" && this.source != null && this.destination != undefined && this.destination != "" && this.destination != null && this.onwardDate != null && this.onwardDate !=undefined){
    this.schedulingService.getAllAvailableFlights(this.onwardDate, this.source, this.destination, "Trip", this.returnDate).subscribe(res =>{ 
      this.flightData = res; });
    }
    else{
      this.flightData = [];
      this.flightID = null;
      this.scheduleID = null;
      this.airlineID = null;
    }
  }
  loadReturnFlights(){
    if(this.source != undefined && this.source != "" && this.source != null && this.destination != undefined && this.destination != "" && this.destination != null && this.returnDate != null && this.returnDate !=undefined){
       this.schedulingService.getAllAvailableFlights(this.onwardDate, this.destination,this.source, "Return", this.returnDate).subscribe(res =>{ 
          this.returnFlights = res; });
    }
    else{
      this.returnFlights = [];
      this.returnFlightID = null;
      this.returnScheduleID = null;
      this.returnAirlineID = null;
    }
  }
  clickFlight(flightID:any, airlineID:any,scheduleID:any, typee:string, businessCost?:number, nonbusinessCost?:number){
   if(this.count == 0){
    if(typee == "trip"){
      this.flightID = flightID;
      this.airlineID = airlineID;
      this.scheduleID = scheduleID;
      this.tripBusinessCost = businessCost;
      this.tripNonBusinessCost= nonbusinessCost;
    }
    else{
      this.returnFlightID = flightID;
      this.returnAirlineID = airlineID;
      this.returnScheduleID = scheduleID;
      this.returnBusinessCost= businessCost;
      this.returnNonBusinessCost= nonbusinessCost;
    }
    let tripp = typee+"_";
    let tripTypee = typee == "trip" ? "tripp" : "returnn";
    if($("div#"+tripp +flightID +" span.badge1").hasClass("bg-secondary2")){
      if(typee == "trip"){
        this.flightID = null;
        this.airlineID = null;
        this.scheduleID = null;
        this.tripBusinessCost =0;
        this.tripNonBusinessCost=0;
      }
      else{
        this.returnFlightID = null;
        this.returnAirlineID = null;
        this.returnScheduleID = null;
        this.returnBusinessCost=0;
        this.returnNonBusinessCost=0;
      }
      $("div#"+tripp +flightID +" span.badge1").addClass("bg-secondary1");
      $("div#"+tripp +flightID +" span.badge1").removeClass("bg-secondary2");
    }
    else{
      $("div span.badge1").addClass("bg-secondary1");
     $("div#"+tripp +flightID +" span.badge1").removeClass("bg-secondary1");
     $("div span."+tripTypee).removeClass("bg-secondary2");
     $("div#"+tripp +flightID +" span.badge1").addClass("bg-secondary2");
   }
  }
  }
  continueBooking(){
    if(this.source == "" || this.source == null || this.source == undefined){
      this.authService.showMessage('','Please enter Source','warning');
    }
    else if(this.destination == "" || this.destination == null || this.destination == undefined){
      this.authService.showMessage('','Please enter Destination','warning');
    }
    else if(this.onwardDate == null || this.onwardDate == undefined)
    {
      this.authService.showMessage('','Please enter Onward Date','warning');
    }
    else if(this.flightID == "" || this.flightID == null || this.flightID == undefined){
      this.authService.showMessage('','Please enter Flight','warning');
    }
    else if((this.returnDate == null || this.returnDate == undefined) && this.tripType == "RoundTrip"){
      this.authService.showMessage('','Please enter Return Date','warning');
    }
    else if((this.returnFlightID == "" || this.returnFlightID == null || this.returnFlightID == undefined) && this.tripType == "RoundTrip"){
      this.authService.showMessage('','Please enter Return Flight','warning');
    }
    else if(this.count == 0){
      this.displayPassenger = "flex";
      this.count=1;
      $("input[type='radio']").attr("disabled", "disabled");
      $("#source").attr("disabled", "disabled");
      $("#destination").attr("disabled", "disabled");
      $("input[type='datetime-local']").attr("disabled", "disabled");
      this.loadSeats(this.scheduleID, this.returnScheduleID);
    }
    else if((this.count == 1 || this.count == 2) && (this.passengerList.length == 0)){
      this.authService.showMessage('','Please add atleast one passenger','warning');
    }
    else if(this.count == 1){
      this.displayDiscount = "block";
      this.count=2;
    }
    else{
      this.booking.flightID = this.flightID;
      this.booking.airlineID = this.airlineID;
      this.booking.returnFlightID = this.returnFlightID;
      this.booking.returnAirlineID = this.returnAirlineID;
      this.booking.tripType= this.tripType;
      this.booking.onwardDate= this.onwardDate;
      this.booking.returnDate = this.returnDate;
      this.booking.modeOfPayment = this.modeOfPayment;
      this.booking.totalPrice = this.totalPricee;
      this.booking.discountPrice=this.discountPrice;
      this.booking.passengerDetails = [];
      for(let det of this.passengerList){
        this.booking.passengerDetails.push({
          "name" :det.name,
          "gender": det.gender,
          "emailId":det.emailId,
          "onwardSeatNumber" :det.onwardSeatNumber,
          "returnSeatNumber" :det.returnSeatNumber,
          "status":det.status,
          "mealPreference":det.mealPreference,
          "seatType" :det.seatType,
          "tripPrice":det.tripPrice,
          "returnPrice":det.returnPrice,
          "age":det.age,
          "discountPrice": this.discountPrice,
          "scheduleID": this.scheduleID,
          "returnScheduleID": this.returnScheduleID,
          "discountID": (this.isDiscount ? this.discountID :null)
        });
      }
     this.bookingService.saveBooking(this.booking).subscribe(res =>
     {  
      this.authService.showMessage('','Flight booked successfully!','success');
      this.router.navigateByUrl('/managebookings');
    });
    }
  }
  loadSeats(scheduleID1?:any, returnscheduleID1?:any){
    this.flightService.getAllSeats(this.flightID, this.returnFlightID, this.scheduleID, this.returnScheduleID).subscribe(res =>
      { 
        debugger
        this.onwardBSeats = res.onwardBusinessSeats;
        this.onwardNBSeats = res.onwardNonBusinessSeats;
        this.returnBSeats=  res.returnBusinessSeats;
        this.returnNBSeats = res.returnNonBusinessSeats;
        this.onwardSeats = this.seatType =="Business" ? res.onwardBusinessSeats : res.onwardNonBusinessSeats;
        this.returnSeats= this.seatType =="Business" ? res.returnBusinessSeats: res.returnNonBusinessSeats;
     });
  }
  loadSeatss(){
    this.onwardSeats = this.seatType =="Business" ? this.onwardBSeats : this.onwardNBSeats;
    this.returnSeats= this.seatType =="Business" ? this.returnBSeats: this.returnNBSeats;
  }
  addPassenger(){
    if(this.name == "" || this.name == undefined){
      this.authService.showMessage('','Please enter name','warning');
    }
    else if(this.gender == "" || this.gender == undefined || this.gender == "Select Gender"){
      this.authService.showMessage('','Please select Gender','warning');
    }
    else if(this.age == null || this.age == undefined){
      this.authService.showMessage('','Please enter Age','warning');
    }
    else if(this.seatType == "" || this.seatType == undefined || this.seatType == "Select Seat Type"){
      this.authService.showMessage('','Please select Seat Type','warning');
    }
    else if((this.onwardSeatNumber == "" || this.onwardSeatNumber == undefined || this.onwardSeatNumber == "Select Onward Seat")){
      this.authService.showMessage('','Please select Onward Seat Number','warning');
    }
    else if((this.returnSeatNumber == "" || this.returnSeatNumber == undefined || this.returnSeatNumber == "Select Return Seat") && this.tripType == "RoundTrip"){
      this.authService.showMessage('','Please select Return Seat Number','warning');
    }
    else{
       let tripAmt = this.seatType == "Business" ? this.tripBusinessCost: this.tripNonBusinessCost;
       this.tripTotal += tripAmt??0;
       if(this.tripType != "OneWay"){
         let returnAmt = this.seatType == "Business" ? this.returnBusinessCost: this.returnNonBusinessCost;
        this.returnTotal += returnAmt??0;
      }
      this.passengerList.push({
        "name": this.name,
        "gender":this.gender,
        "seatType":this.seatType,
        "onwardSeatNumber" :this.onwardSeatNumber,
        "returnSeatNumber" :this.returnSeatNumber,
        "tripPrice": tripAmt,
        "returnPrice":  this.seatType == "Business" ? this.returnBusinessCost: this.returnNonBusinessCost,
        "mealPreference":this.mealPreference,
        "emailId":this.emailId,
        "age":this.age,
        "status": "Booked",
      });
      this.displayPriceTag ="flex";
      this.updatePrices();
       this.name="";
       this.gender="";
       this.seatType="";
       this.totalPrice=0;
       this.mealPreference="";
       this.emailId="";
       this.onwardSeatNumber = "";
       this.returnSeatNumber="";
       this.age= 0;
       this.emailId="";
    }
  }
  delete(item?:any, index?:number){
    this.totalPricee =  this.totalPricee - item.totalPrice;
    this.updatePrices();
    this.passengerList.splice(index,1);
}
addDiscount(discountID?:any,discountPrice?:number){
  debugger
  if(discountID){
    this.discountService.getDiscountDetail(discountID).subscribe(res =>  { 
      this.discountPrice = res.amount;
      this.isDiscount =true;
    this.discountID =discountID;
    if(this.discountPrice < this.totalPricee){
      this.totalPricee = this.totalPricee - this.discountPrice;
    }
    else{
      this.totalPricee = 0;
    }
    this.updatePrices();
    });
  }
  else{
    this.isDiscount=false;
    this.discountPrice=0;
    this.discountID = null;
    this.totalPricee = this.totalPricee + this.discountPrice;
  }
}
updatePrices(){
  let discPrice = (this.tripTotal + this.returnTotal) -  this.discountPrice;
  $("#priceAftrDisc").html("$"+discPrice.toString());
  $("#discAmt").html("$"+this.discountPrice.toString());
  $("#oneWayPrice").html("$"+(this.tripTotal));
  $("#roundTripPrice").html("$"+(this.returnTotal));
}
}
