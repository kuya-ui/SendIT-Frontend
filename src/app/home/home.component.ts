import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {GeocoderService} from "../shared/geocoder.service";
import {environment} from "../../environments/environment";
import * as turf from '@turf/turf';
import * as $ from 'jquery';
import {LocationService} from "../shared/location.service";
import {OrderService} from "../shared/order.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mapboxToken = environment.mapbox.accessToken
  start_loc: any;
  dest_loc: any;
  to_fro_distance: any;
  load_size: any;
  submitted: any;
  cost_per_km: any;
  price: any;
  estimated_arrival_time: any;
  user: any;
  description: any;

  order_form: boolean = false;
  create_order: boolean = true;
  my_orders: boolean = true;
  startloc_form: boolean = true;
  destloc_form: boolean = false;
  price_form: boolean = false;
  orderdetails_form: boolean = false;
  tests: boolean = true;
  yes_orders: boolean = false;
  no_orders: boolean = true;
  orders: any;
  my_django_orders: any;
  dest_change: any;
  change_destination_order_id:any
  new_destination: any;
  new_order_details:any;

  constructor(private router: Router, private geocoderService: GeocoderService, private locationService: LocationService, private orderService: OrderService) {
  }
  ngOnInit() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data
      this.my_django_orders = JSON.parse(this.orders.orders)
      if (this.my_django_orders.length > 0) {
        this.yes_orders = true
        this.no_orders = false
      }
    })

  }
  loadOrderForm() {
    this.my_orders = false;
    this.create_order = false;
    this.order_form = true;
  }
  startPlaceSubmit(address: string) {
    this.geocoderService.forwardGeocoding(address, this.mapboxToken).subscribe((data: any) => {
        var response_array: Array<any>
        var start_location: any

        response_array = []
        for (var dict in data["features"]) {
          if (data["features"][dict]["context"][data["features"][dict]["context"].length - 1]["text"] == "Kenya") {
            response_array.push(data["features"][dict])
          }
        }
        start_location = {
          "place_name": response_array[0]["place_name"],
          "co_ords": response_array[0]["center"]
        }
        localStorage.setItem('start_location', JSON.stringify(start_location));
        this.start_loc = start_location
        var start_location_post = {
          "name": this.start_loc["place_name"],
          "longitude": this.start_loc["co_ords"][0],
          "latitude": this.start_loc["co_ords"][1]
        }
        this.locationService.createLocation(start_location_post).subscribe((data: any) => {
            localStorage.setItem("start_location_id", data["location_id"])
          },
          (err: HttpErrorResponse) => {
            console.log(HttpErrorResponse)
          });

        $("#startNext").prop("disabled", false)


      },
      (err: HttpErrorResponse) => {
        console.log(HttpErrorResponse)
      });
  }
  startPlaceNext() {
    this.startloc_form = false;
    this.destloc_form = true;
  }
  destinationPlaceSubmit(address: string) {
    this.geocoderService.forwardGeocoding(address, this.mapboxToken).subscribe((data: any) => {
        var response_array: Array<any>
        var end_location: any
        response_array = []

        for (var dict in data["features"]) {
          if (data["features"][dict]["context"][data["features"][dict]["context"].length - 1]["text"] == "Kenya") {
            response_array.push(data["features"][dict])
          }
        }
        end_location = {
          "place_name": response_array[0]["place_name"],
          "co_ords": response_array[0]["center"]
        }
        localStorage.setItem("end_location", JSON.stringify(end_location))
        this.dest_loc = end_location
        var destination_location_post = {
          "name": this.dest_loc["place_name"],
          "longitude": this.dest_loc["co_ords"][0],
          "latitude": this.dest_loc["co_ords"][1]
        }
        this.locationService.createLocation(destination_location_post).subscribe((data: any) => {
            localStorage.setItem("destination_location_id", data["location_id"])
          },
          (err: HttpErrorResponse) => {
            console.log(HttpErrorResponse)
          });
        $("#destNext").prop("disabled", false)

      },
      (err: HttpErrorResponse) => {
        console.log(HttpErrorResponse)
      });
  }
  destPlaceNext() {
    this.destloc_form = false;
    this.price_form = true;
    var from: any
    var to: any
    var start_location: any
    var destination: any
    var options: any
    var distance: number;


    options = {units: 'kilometers'};

    start_location = localStorage.getItem("start_location")
    destination = localStorage.getItem("end_location")

    from = JSON.parse(start_location)["co_ords"]
    to = JSON.parse(destination)["co_ords"]
    distance = turf.distance(from, to, options);
    localStorage.setItem("distance", distance.toString())
    this.to_fro_distance = Math.round(distance)
    this.cost_per_km = 10
    this.price = this.cost_per_km * Math.round(distance)
    localStorage.setItem("cost_per_km", this.cost_per_km.toString())
    localStorage.setItem("price", this.price.toString())


  }
  calculatePrice(loadsize: string) {
    this.load_size = loadsize
    localStorage.setItem("load_size", this.load_size)
    if (loadsize == "Small") {
      this.cost_per_km = 10
      this.price = Math.round(Number(localStorage.getItem("distance")) * this.cost_per_km)
      localStorage.setItem("price", this.price.toString())
      localStorage.setItem("cost_per_km", this.cost_per_km.toString())

    } else if (loadsize == "Medium") {
      this.cost_per_km = 18
      this.price = Math.round(Number(localStorage.getItem("distance")) * this.cost_per_km)
      localStorage.setItem("price", this.price.toString())
      localStorage.setItem("cost_per_km", this.cost_per_km.toString())
    } else {
      this.cost_per_km = 23
      this.price = Math.round(Number(localStorage.getItem("distance")) * this.cost_per_km)
      localStorage.setItem("price", this.price.toString())
      localStorage.setItem("cost_per_km", this.cost_per_km.toString())
    }

    this.estimated_arrival_time = Math.round((Number(localStorage.getItem("distance"))) / 80)
    localStorage.setItem("estimated_arrival_time", this.estimated_arrival_time.toString())

    $("#priceNext").prop("disabled", false)
  }
  priceNext(loadsize: string) {
    this.price_form = false;
    this.orderdetails_form = true;

    this.estimated_arrival_time = Math.round((Number(localStorage.getItem("distance"))) / 80)
    localStorage.setItem("estimated_arrival_time", this.estimated_arrival_time.toString())

    this.load_size = loadsize
    localStorage.setItem("load_size", this.load_size)
  }
  createOrder(description: string) {
    this.start_loc = localStorage.getItem("start_location_id")
    this.dest_loc = localStorage.getItem("destination_location_id")
    this.load_size = localStorage.getItem("load_size")
    this.estimated_arrival_time = localStorage.getItem("estimated_arrival_time")
    this.price = localStorage.getItem("price")
    this.description = description

    var username = JSON.parse(<string>localStorage.getItem("current_user"))[0]["fields"]["username"]
    var order_dict = {
      "username": username,
      "start_location_id": this.start_loc,
      "destination_location_id": this.dest_loc,
      "load_size": this.load_size,
      "estimated_arrival_time": this.estimated_arrival_time,
      "price":this.price,
      "description": this.description
    }
    this.orderService.createOrder(order_dict).subscribe((data: any) => {
        console.log(data)
      },
      (err: HttpErrorResponse) => {
        console.log(HttpErrorResponse)
      });

    this.orderdetails_form = false;
    this.order_form = false;
    this.my_orders = true;
    this.create_order = true;
    this.yes_orders = true;
    this.no_orders = false;
    window.location.reload()
  }

  toggleNewDestinationForm(entry_id:any){
    this.change_destination_order_id = entry_id
    this.my_orders = false;
    this.dest_change = true;
  }

  getNewDestination(address:any){
    this.geocoderService.forwardGeocoding(address, this.mapboxToken).subscribe((data: any) => {
        var response_array: Array<any>
        var end_location: any
        response_array = []

        for (var dict in data["features"]) {
          if (data["features"][dict]["context"][data["features"][dict]["context"].length - 1]["text"] == "Kenya") {
            response_array.push(data["features"][dict])
          }
        }
        end_location = {
          "place_name": response_array[0]["place_name"],
          "co_ords": response_array[0]["center"]
        }
        localStorage.setItem("new_destination", JSON.stringify(end_location))
        this.new_destination = end_location
        var new_destination_location_post = {
          "name": this.new_destination["place_name"],
          "longitude": this.new_destination["co_ords"][0],
          "latitude": this.new_destination["co_ords"][1]
        }
        this.locationService.createLocation(new_destination_location_post).subscribe((data: any) => {
            localStorage.setItem("new_destination_location_id", data["location_id"])
            $("#change_destination_button").prop("disabled", false)
          },
          (err: HttpErrorResponse) => {
            console.log(HttpErrorResponse)
          });

      },
      (err: HttpErrorResponse) => {
        console.log(HttpErrorResponse)
      });
  }

  changeDestination(entry_id:any){
    console.log(entry_id)
    var destination_id = Number(localStorage.getItem("new_destination_location_id"))
    var location_id = {
      "location_id": destination_id
    }
    this.orderService.changeOrderDestination(entry_id, location_id).subscribe(data=>{
    });
    this.orderService.getOrderLocationDetails(entry_id).subscribe(data=>{
      this.new_order_details = data
      var from: any
      var to: any
      var options: any

      options = {units: 'kilometers'};
      from = this.new_order_details["start_place_co_ordinates"]
      to = JSON.parse(<string>localStorage.getItem("new_destination"))["co_ords"]
      if (this.new_order_details["load_size"]=='Small'){
        this.price = 10 * Math.round(turf.distance(from, to, options))
      }
      else if (this.new_order_details["load_size"]=='Medium'){
        this.price = 18 * Math.round(turf.distance(from, to, options))
      }
      else {
        this.price = 23 * Math.round(turf.distance(from, to, options))
      }
      var order_updates = {
        "estimated_arrival_time": Math.round(turf.distance(from, to, options)/80),
        "price": this.price
      }
      console.log(order_updates)
      this.orderService.updateOrder(entry_id, order_updates ).subscribe(data=>{
        window.location.reload()
      })






    })

  }
  cancelOrder(entry_id:any){
    this.orderService.cancelOrder(entry_id).subscribe(data=>{
      window.location.reload()
    });
  }


}
