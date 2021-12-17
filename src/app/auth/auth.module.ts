import { AuthRoutingModile } from './auth-routing.module';
import { ShareModule } from './../shared/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SigupComponent } from "./sigup/sigup.component";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    SigupComponent,
    LoginComponent,
  ],
  imports: [
    ShareModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AuthRoutingModile
  ],
})
export class AuthModule {}
