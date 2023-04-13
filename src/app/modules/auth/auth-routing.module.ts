import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PATHS } from 'src/app/common/constants';
import { OtpComponent } from './otp/otp.component';
import { IsLoginGuard } from 'src/app/core/guards/is-login.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { IsprofileCreatedGuard } from 'src/app/core/guards/isprofile-created.guard';


const routes: Routes = [
    {path:'',redirectTo:PATHS.AUTH.LOGIN,pathMatch:'full'},
  {path:PATHS.AUTH.LOGIN,canActivate:[IsLoginGuard],component:LoginComponent},
  {path:PATHS.AUTH.REGISTER,canActivate:[IsprofileCreatedGuard],component:SignUpComponent},
  {path:PATHS.AUTH.GET_OTP,canActivate:[IsLoginGuard],component:OtpComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
