import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { UIservice } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent implements OnInit, OnDestroy {

  public maxDate = new Date();
  public isLoading: boolean;
  private loadingSub: Subscription;

  constructor(
    private service: AuthService,
    private UIservice: UIservice
  ) {}

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSub = this.UIservice.loadingStateChange.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
  }

  signUp(form: NgForm): void {
    this.service.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSub) this.loadingSub.unsubscribe();
  }
}
