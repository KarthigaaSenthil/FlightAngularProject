import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';
import { UserLogin } from '../models/UserLogin/user-login';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // constructor(private router:Router) { }
  userData:any;
  EmailAddress?:string;
  Password?:string;
  loginData:UserLogin;
  constructor(private router:Router, private authService:AuthService,private httpClient : HttpClient){
    this.loginData=new UserLogin();
  }
  ngOnInit(): void {
  }

  onLoginClick(){
    this.loginData.EmailAddress =this.EmailAddress;
    this.loginData.Password = this.Password;
    if(this.EmailAddress == null || this.EmailAddress == "" || this.EmailAddress == undefined){
      this.authService.showMessage('', 'Please enter Email Address','warning');
    }
    else if(this.Password == null || this.Password == "" || this.Password == undefined){
      this.authService.showMessage('', 'Please enter Password','warning');
    }
    else{
    this.httpClient.post<any>('http://localhost:12672/users/authenticate', this.loginData).subscribe(
    {
       next:(res) =>{
         this.authService.setToken(res);
         Swal.fire('','You are logged in successfully', 'success');
         this.authService.navigation('/dashboard');
       },
       error:(e) => this.authService.showMessage('','You are not a valid user! Please check your credentials!', 'error')
  });
}
  }
 
}
