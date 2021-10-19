mport {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {SenditComponent} from "./sendit/sendit.component";
import {SignUpComponent} from "./user/sign-up/sign-up.component";
import {SignInComponent} from "./user/sign-in/sign-in.component";
import {AuthGuard} from "./auth/auth.guard";

export const appRoutes: Routes = [
  { path: 'sendit-frontend/dashboard', component: HomeComponent, canActivate:[AuthGuard] },
  {
    path: 'sendit-frontend/signup', component: UserComponent,
    children: [{ path: 'sendit-frontend', component: SignUpComponent }]
  },
  {
    path: 'sendit-frontend/login', component: UserComponent,
    children: [{ path: 'sendit-frontend', component: SignInComponent }]
  },
  { path : 'sendit-frontend', component: SenditComponent },
];