import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IonicModule } from '@ionic/angular';
import { OtpComponent } from './otp/otp.component';
@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    OtpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    AuthRoutingModule,
    IonicModule
  ],
  exports:[LoginComponent,SignUpComponent]
})
export class AuthModule { }
