import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router :Router) { }
  setToken(res:any){
    localStorage.setItem("token",res.token);
    localStorage.setItem("userID",res.userDetails.userID);
    localStorage.setItem("userRole",res.userDetails.userRole);
  }
  getUserToken(){
    return localStorage.getItem("token");
  }
  getUserRole(){
    return localStorage.getItem("userRole");
  }
  logOut(){
    Swal.fire({
      title: '',
      text: 'Do you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigateByUrl("/login");
      }
    })
  }
  navigation(pageName:string){
    this.router.navigateByUrl(pageName);
  }
  showMessage(title?:string, text?:string, type?:any){
    Swal.fire(title,text, type);
  }
}
