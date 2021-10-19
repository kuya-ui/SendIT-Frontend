import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sendit',
  templateUrl: './sendit.component.html',
  styleUrls: ['./sendit.component.css']
})
export class SenditComponent implements OnInit {
  response: any;


  constructor(private http: HttpClient) {
  }

  ngOnInit() {


    interface ApiResponse {
      results: any;
    }


    this.http.get<ApiResponse>("http://4cd2-197-156-137-144.ngrok.io/users/?format=json").subscribe(data => {
      this.response = data["results"];
    })

  }
}
