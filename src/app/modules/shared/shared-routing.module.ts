import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { NavbarComponent } from './navbar/navbar.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CookiesComponent } from './cookies/cookies.component';



const routes: Routes = [
  {path:PATHS.SHARED.NAVBAR,component:NavbarComponent},
  {path:PATHS.SHARED.PRIVACY_POLICY,component:PrivacyPolicyComponent},
  {path:PATHS.SHARED.COOKIES,component:CookiesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
