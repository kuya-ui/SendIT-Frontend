import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sendit',
  templateUrl: './sendit.component.html',
  styleUrls: ['./sendit.component.css']
})
export class SenditComponent implements OnInit {
  response: any;


  constructor() {
  }

  ngOnInit() {

  }
}
