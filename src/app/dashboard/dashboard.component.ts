import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.loadDashboards();
  }
  loadDashboards(){
   this.userService.getDashboardDetails().subscribe(res =>{
      $(".todayBookings").html(res.todayBookings);
      $(".overallBooking").html(res.overallBookings);
  })
}
}
