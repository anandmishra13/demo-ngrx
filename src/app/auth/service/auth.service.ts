import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { TrainingService } from "src/app/training/service/training.service";
import { AuthData } from "../interface/auto-data.model";
import { User } from "../interface/user.model";

@Injectable()
export class AuthService {

  public authChnage = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private service: TrainingService
  ) { }

  initAuthListner() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChnage.next(true);
        this.router.navigate(['/training']);
      } else {
        this.service.cancelSubscription();
        this.isAuthenticated = false;
        this.authChnage.next(false);
        this.router.navigate(['/login']);
      }
    });
  }
  registerUser(authData: AuthData): void {
    this.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    });
  }
  loginData(authData: AuthData): void {
    this.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(res => {
      console.log(res);
    })
    .catch(err => {
        console.log(err)
    })
  }

  logout() {
    this.auth.signOut();
  }
  isAuth() {
    return this.isAuthenticated;
  }
}
