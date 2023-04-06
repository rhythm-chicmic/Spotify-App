import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { HomeComponent } from './home/home.component';
import { YourLibraryComponent } from './your-library/your-library.component';


const routes: Routes = [
  {path:PATHS.MAIN.DASHBOARD,component:HomeComponent},
  {path:PATHS.MAIN.YOUR_LIBRARY,component:YourLibraryComponent},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
