import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AirlineComponent } from './airline/airline.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FlightComponent } from './flight/flight.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DiscountComponent } from './discount/discount/discount.component';
import { SchedulingComponent } from './scheduling/scheduling/scheduling.component';
import { BookingComponent } from './booking/booking/booking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookinghistoryComponent } from './bookinghistory/bookinghistory.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AirlineComponent,
    LoginComponent,
    HeaderComponent,
    FlightComponent,
    DiscountComponent,
    SchedulingComponent,
    BookingComponent,
    DashboardComponent,
    BookinghistoryComponent,
    UsersComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
