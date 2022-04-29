import { Component, OnInit } from '@angular/core';
import { Discount } from 'src/app/models/discount/discount';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DiscountService } from 'src/app/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  discount:Discount;
  discountData :any=[];
  discountID?:any;
  discountCode?:string;
  amount?:any;
  startDate?:Date;
  expiryDate?:Date;
  searchString?:string;
  display ="none";
  constructor(private discountService: DiscountService, private authService :AuthService) {
    this.discount = new Discount();
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
    this.loadDiscounts();
   }
   loadDiscounts(){
     if(this.searchString == undefined){
      this.searchString="";
     }
    this.discountService.getAllDiscounts(this.searchString).subscribe(res =>{
      this.discountData = res; 
     });
   }
   getDiscount(discountID:any){
    this.discountService.getDiscountDetail(discountID).subscribe(res =>{
        this.openModal();
        this.discountID = res.discountID;
        this.discountCode = res.discountCode;
        this.amount = res.amount;
        this.startDate = res.startDate;
        this.expiryDate = res.expiryDate;
     });
   }  
   saveDiscounts() {
    if(this.discount.discountID){
     this.discount.discountID = null;
    }
    if(this.discountCode == null || this.discountCode == ""){
      this.authService.showMessage('','Please enter Discount Code','warning');
    }
    else if(this.amount == null){
      this.authService.showMessage('','Please enter Amount','warning');
    }
    else if(this.startDate == null || this.startDate == undefined){
      this.authService.showMessage('','Please select Start Date','warning');
    }
    else if(this.expiryDate == null || this.expiryDate == undefined){
      this.authService.showMessage('','Please select End Date','warning');
    }
    else{
      this.discount.discountID = this.discountID;
      this.discount.discountCode = this.discountCode;
      this.discount.amount= this.amount;
      this.discount.startDate = this.startDate;
      this.discount.expiryDate = this.expiryDate;
      this.discountService.saveDiscount(this.discount).subscribe(res =>
    {  
      this.authService.showMessage('','Discount successfully saved!','success');
      this.loadDiscounts();
      this.onCloseHandled();
    });
}
   }
}
