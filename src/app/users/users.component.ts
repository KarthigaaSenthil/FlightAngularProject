import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users/users';
import { AuthService } from '../services/auth/auth.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  display ="none";
  user: Users;
  userData :any=[];
  userID?:any;
  name?:string;
  role?:string;
  password?:string;
  emailId?:string;
  phoneNumber?:string;
  isActive?:boolean=true;
  searchString?:string;
  isActiveSeacrh?:string="Active";
  constructor(private userService: UsersService, private authService:AuthService) {
    this.user = new Users();
   }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  clearTxt(){
    this.searchString ="";
    this.isActiveSeacrh="Active";
  }
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(){
    if(this.searchString == undefined){
     this.searchString="";
    }
   this.userService.getAllUsers(this.searchString,this.isActiveSeacrh).subscribe(res =>{
     this.userData = res; 
    });
  }
  getUser(userID:any){
    this.userService.getUserDetail(userID).subscribe(res =>{
        this.openModal();
        this.userID = res.userID;
        this.name = res.name;
        this.role = res.role;
        this.password = res.password;
        this.emailId = res.emailId;
        this.phoneNumber = res.phoneNumber;
        this.isActive = res.isActive;
     });
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
      this.user.isActive = this.isActive;
      this.userService.saveUser(this.user).subscribe(res =>
    {  
      this.authService.showMessage('','User successfully saved!','success');
      this.loadUsers();
      this.onCloseHandled();
    });
}
   }
}
