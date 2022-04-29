import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Passengerdetails } from '../models/passengerdetails/passengerdetails';
import { BookingService } from '../services/booking/booking.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent implements OnInit {
  bookingData?:any[];
  passengerData?:Passengerdetails[];
  passengerID?:any;
  searchString?:string;
  fileName= 'BookingHistory.xlsx'; 
  isManageBooking = false;
  bookingpnrid?:any;
  // passenger:Passengerdetails;
  display="none";
  constructor(private activatedRoute: ActivatedRoute, private bookingService: BookingService, private router:Router,private renderer: Renderer2) {
    // this.passenger=new Passengerdetails();
   }

  ngOnInit(): void {
    this.loadBookings();
    this.activatedRoute.queryParams.subscribe(params => {
     this.isManageBooking = params['isManageBooking'];
    });
  }
  loadBookings(isManageBookings?:string){
    if(this.searchString == undefined){
     this.searchString="";
    }
   this.bookingService.getAllBookings(this.searchString).subscribe(res =>{
     this.bookingData = res; 
    });
  }
  clearTxt(){
    this.searchString ="";
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  getPassengers(pNRID:any){
    this.bookingService.getAllPassengerDetails(pNRID).subscribe(res =>{
        this.openModal();
        this.bookingpnrid = pNRID;
        this.passengerData = res;
     });
   }  
   getPassenger(passengerId:any){
    //  this.passenger.passengerID = passengerId;
    if(confirm("Do you want to cancel this passenger?")) {
     
      this.bookingService.cancelPassenger(passengerId).subscribe(res =>{
        this.onCloseHandled();
        this.loadBookings();
     });
   }
  }
  downloadFile(pNRID?:any) :void {
    this.bookingService.getAllPassengerDetails(pNRID).subscribe(res =>{
      this.passengerData = res;
      this.downloadExcel();
   });
   
 }
 downloadExcel(){
    /* table id is passed over here */   
    let element = document.getElementById('excel-table'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
 }
}
