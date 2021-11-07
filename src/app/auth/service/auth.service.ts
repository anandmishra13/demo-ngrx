import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "../interface/auto-data.model";
import { User } from "../interface/user.model";

@Injectable()
export class AuthService {

  private user: User;
  public authChnage = new Subject<boolean>();

  constructor(
    private router: Router
  ){}

  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userid: Math.random().toString()
    };
    this.authSuccesfully();
  }
  loginData(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userid: Math.random().toString()
    };
    this.authSuccesfully();
  }

  logout() {
    this.user = null as any;
    this.authChnage.next(false);
    this.router.navigate(['/login']);
  }
  getUser() {
    return {...this.user};
  }
  isAuth() {
    return this.user != null;
  }
  private authSuccesfully() {
    this.authChnage.next(true);
    this.router.navigate(['/training']);
  }
}
