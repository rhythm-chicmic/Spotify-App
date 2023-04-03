import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PATHS } from 'src/app/common/constants';


const routes: Routes = [
    {path:'',redirectTo:PATHS.AUTH.LOGIN,pathMatch:'full'},
  {path:PATHS.AUTH.LOGIN,component:LoginComponent},
  {path:PATHS.AUTH.REGISTER,component:SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
