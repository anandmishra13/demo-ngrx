import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private service: AuthService
  ) {}

  ngOnInit(): void {
  }
  signIn(form: NgForm): void {
    this.service.loginData({
      email: form.value.email,
      password: form.value.password
    })
  }
}
