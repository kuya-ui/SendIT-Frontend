import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user.models";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'https://restflani.herokuapp.com/api/';
  constructor(private http: HttpClient) {
  }
  registerUser(user: User) {
    const body: User = {
      first_name: user.first_name,
      last_name: user.last_name,
      phonenumber: user.phonenumber,
      username: user.username,
      email: user.email,
      password: user.password

    }
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post(this.rootUrl + 'register/', JSON.stringify(body), {headers: reqHeader});
  }

  userAuthentication(username: string, password: string) {
    var data = {
      "username":username,
      "password":password
    }

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post(this.rootUrl + 'login/', JSON.stringify(data), {headers: reqHeader});

  }

  getUserClaims() {
    return this.http.get(this.rootUrl + 'users');
  }

}
