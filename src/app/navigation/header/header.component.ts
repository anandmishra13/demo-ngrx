import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sideNavToggle = new EventEmitter<void>();
  public isAuth: boolean;
  private authSubscription: Subscription;

  constructor(
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.service.authChnage.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }
  onToggleSideNav() : void {
    this.sideNavToggle.emit();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
