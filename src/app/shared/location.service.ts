import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  readonly rootUrl = 'https://restflani.herokuapp.com/api/';

  constructor(private http: HttpClient) {

  }
  createLocation(location_data:any){

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.rootUrl + `locations/create`,JSON.stringify(location_data),{headers: reqHeader});
  }

}
