import { EventEmitter, OnDestroy } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() toggleSideNav = new EventEmitter<void>();
  public isAuth: boolean;
  authSubscription: Subscription;

  constructor(
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.service.authChnage.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }
  onClose(): void {
    this.toggleSideNav.emit();
  }
  onLogout() {
    this.service.logout();
    this.toggleSideNav.emit();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
