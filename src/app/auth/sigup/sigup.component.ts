import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent implements OnInit {

  public maxDate = new Date();
  constructor(
    private service: AuthService
  ) {}

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  signUp(form: NgForm): void {
    this.service.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
