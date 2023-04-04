import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IonicModule } from '@ionic/angular';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
    SweetAlert2Module,
    AuthRoutingModule,
    NgOtpInputModule,
    IonicModule
  ],
  exports:[LoginComponent,SignUpComponent,OtpComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
