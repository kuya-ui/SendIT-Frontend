import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SenditComponent } from './sendit/sendit.component';
import {HttpClientModule} from "@angular/common/http";
import { UserComponent } from './user/user.component';
import {SignInComponent} from "./user/sign-in/sign-in.component";
import {SignUpComponent} from "./user/sign-up/sign-up.component";
import { HomeComponent } from './home/home.component';
import {UserService} from "./shared/user.service";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {appRoutes} from "./routes";
import {AuthGuard} from "./auth/auth.guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {LocationService} from "./shared/location.service";
import {OrderService} from "./shared/order.service";
import {GeocoderService} from "./shared/geocoder.service";

@NgModule({
  declarations: [
    AppComponent,
    SenditComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [UserService, AuthGuard, LocationService, OrderService,GeocoderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
