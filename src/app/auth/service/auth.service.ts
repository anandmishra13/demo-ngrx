import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { UIservice } from "src/app/shared/ui.service";
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
    private service: TrainingService,
    private snackbar: MatSnackBar,
    private UIservice: UIservice
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
    this.UIservice.loadingStateChange.next(true);
    this.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(res => {
      this.UIservice.loadingStateChange.next(false);
    })
    .catch(err => {
      this.UIservice.loadingStateChange.next(false);
      this.UIservice.showSnackbar(
        'The email address is already in use by another account',
        'close',
        4000
      );
    });
  }
  loginData(authData: AuthData): void {
    this.UIservice.loadingStateChange.next(true);
    this.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(res => {
      this.UIservice.loadingStateChange.next(false);
    })
    .catch(err => {
      this.UIservice.loadingStateChange.next(false);
      this.UIservice.showSnackbar(
        'The password is invalid or the user does not have a password',
        'close',
        4000
      )
    })
  }

  logout() {
    this.auth.signOut();
  }
  isAuth() {
    return this.isAuthenticated;
  }
}
