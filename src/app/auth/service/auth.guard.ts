import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private service: AuthService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.isAuth();
  }
}