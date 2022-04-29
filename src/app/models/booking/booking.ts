import { Passengerdetails } from "../passengerdetails/passengerdetails";

export class Booking {
    //PNRID
    flightID?:any;
    airlineID?:any;
    returnFlightID?:any;
    returnAirlineID?:any;
    tripType?:string;
    onwardDate?:Date;
    returnDate?:Date|null;
    modeOfPayment?:string;
    totalPrice?:number;
    discountPrice?:number;
    priceAfterDiscount?:number;
    scheduleID:any;
    returnScheduleID:any;
    passengerDetails?:Passengerdetails[];
}
