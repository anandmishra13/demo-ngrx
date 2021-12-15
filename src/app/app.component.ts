import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo-ngrx';

  constructor(
    private service: AuthService
  ) {}
  ngOnInit(): void {
      this.service.initAuthListner();
  }
}
