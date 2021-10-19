import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/user-service/user.service";
import {NgForm} from "@angular/forms";
import {User} from "../../shared/user.models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User | any;
  emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      first_name: "",
      last_name: "",
      phonenumber: "",
      username: "",
      email: "",
      password: ""
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.username != null) {
          this.resetForm(form);
          this.router.navigate(['/login']);
        }
        else
          alert(data.Errors[0]);
      });
  }

}
