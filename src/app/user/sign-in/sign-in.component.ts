import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/user-service/user.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(username: string, password: string){
    this.userService.userAuthentication(username,password).subscribe((data : any)=>{
        localStorage.setItem('userToken',data.Token);
        this.router.navigate(['/dashboard']);
      },
      (err : HttpErrorResponse)=>{
        this.isLoginError = true;
        console.log(HttpErrorResponse)
      });
  }


}
