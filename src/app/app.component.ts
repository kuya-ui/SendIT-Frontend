import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./shared/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  is_authenticated: any;


  constructor(private router: Router, private userService: UserService){
    if (localStorage.getItem("userToken") != null){
      this.is_authenticated = true

    }
  }
  Logout() {
    localStorage.clear()
    this.router.navigate(['/']);
  }
}
