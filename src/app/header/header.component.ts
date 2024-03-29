import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  display="none";
  role = this.authService.getUserRole();
  constructor(private authService :AuthService) { }
  ngOnInit(): void {

  }
  logoutSession(){
   this.authService.logOut();
  }
}
