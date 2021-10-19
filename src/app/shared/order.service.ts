import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user.models";
import {OrderModel} from "./order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly rootUrl = 'https://restflani.herokuapp.com/api/';

  constructor(private http: HttpClient) { }
  getOrders() {
    var current_user_object = JSON.parse(<string>localStorage.getItem("current_user"))
    var current_user_id = Number(current_user_object[0]["pk"])

    return this.http.get(this.rootUrl + `orders/get/${current_user_id}`);
  }

  createOrder(order_data:any){
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.rootUrl + `orders/create`,JSON.stringify(order_data),{headers: reqHeader});
  }

  cancelOrder(order_id:any){
    return this.http.get(this.rootUrl + `orders/cancel/${order_id}`);
  }

  changeOrderDestination(order_id:any, destination_id:any){
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.rootUrl + `orders/destination/${order_id}`,JSON.stringify(destination_id),{headers: reqHeader});
  }
  getOrderLocationDetails(order_id:any){
    return this.http.get(this.rootUrl + `orders/location_details/${order_id}`);
  }

  updateOrder(order_id: any, order_updates:any) {
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(this.rootUrl + `orders/update/${order_id}`,JSON.stringify(order_updates),{headers: reqHeader});


  }
}
