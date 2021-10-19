import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./shared/user-service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private router: Router, private userService: UserService){

  }
  Logout() {
    localStorage.removeItem('userToken');

    this.router.navigate(['/']);
  }
}
