import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIservice } from 'src/app/shared/ui.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public isLoading: boolean;
  private loadingSub: Subscription;

  constructor(
    private service: AuthService,
    private UIservice: UIservice
  ) {}

  ngOnInit(): void {
    this.loadingSub = this.UIservice.loadingStateChange.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
  }
  signIn(form: NgForm): void {
    this.service.loginData({
      email: form.value.email,
      password: form.value.password
    })
  }
  ngOnDestroy(): void {
    if (this.loadingSub) this.loadingSub.unsubscribe();
  }
}
