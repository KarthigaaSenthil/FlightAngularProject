import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirlineComponent } from './airline/airline.component';
import { BookingComponent } from './booking/booking/booking.component';
import { BookinghistoryComponent } from './bookinghistory/bookinghistory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiscountComponent } from './discount/discount/discount.component';
import { FlightComponent } from './flight/flight.component';
import { AuthGuard } from './guard/auth.guard';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { Scheduling } from './models/scheduling/scheduling';
import { RegisterComponent } from './register/register.component';
import { SchedulingComponent } from './scheduling/scheduling/scheduling.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
     path:"",
     redirectTo: "login",
     pathMatch:'full'
  },
{
  path:"login",
  component:LoginComponent,
},
{
  path:"register",
  component: RegisterComponent
},
{
  path:"header",
  component:HeaderComponent, canActivate:[AuthGuard]
},
{
  path:"dashboard",
  component: DashboardComponent, canActivate:[AuthGuard]
},
{
  path:"airline",
  component: AirlineComponent, canActivate:[AuthGuard]
},
{
  path:"flight",
  component: FlightComponent, canActivate:[AuthGuard]
},
{
path:"discount",
component: DiscountComponent, canActivate:[AuthGuard]
},
{
  path:"scheduling",
  component: SchedulingComponent, canActivate:[AuthGuard]
  },
  {
    path:"booking",
    component: BookingComponent, canActivate:[AuthGuard]
    },
    {
      path:"managebookings",
      component: BookinghistoryComponent, canActivate:[AuthGuard]
    },
    {
      path:"bookingHistory",
      component: BookinghistoryComponent, canActivate:[AuthGuard]
      },
      {
        path:"user",
        component: UsersComponent, canActivate:[AuthGuard]
      },
{
  path: "**",
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
