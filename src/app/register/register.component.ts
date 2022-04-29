import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users/users';
import { AuthService } from '../services/auth/auth.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: Users;
  userID?:any;
  name?:string;
  role?:string;
  password?:string;
  emailId?:string;
  phoneNumber?:string;
  constructor(private userService:UsersService,private authService:AuthService) { 
     this.user = new Users();
  }

  ngOnInit(): void {
  }
  saveUser() {
    if(this.user.userID){
     this.user.userID = null;
    }
    if(this.name == null || this.name == ""){
      this.authService.showMessage('','Please enter Name','warning');
    }
    else if(this.role == null || this.role == ""|| this.role == undefined || this.role == "Select Role"){
      this.authService.showMessage('','Please enter Role','warning');
    }
    else if(this.password == null || this.password == ""|| this.password == undefined){
      this.authService.showMessage('','Please enter Password','warning');
    }
    else if(this.emailId == null || this.emailId == undefined){
      this.authService.showMessage('','Please enter Email Id','warning');
    }
    else{
      this.user.userID = this.userID;
      this.user.name = this.name;
      this.user.role= this.role;
      this.user.password = this.password;
      this.user.emailId = this.emailId;
      this.user.phoneNumber = this.phoneNumber;
      this.user.isActive = true;
      this.userService.registerUser(this.user).subscribe(res =>
    { 
      this.authService.showMessage('','User registered successfully!','success'); 
      this.authService.navigation('/login');
    });
}
  }
}
