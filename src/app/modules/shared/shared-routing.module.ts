import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { NavbarComponent } from './navbar/navbar.component';



const routes: Routes = [
  {path:PATHS.SHARED.NAVBAR,component:NavbarComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
