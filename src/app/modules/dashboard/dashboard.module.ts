import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { YourLibraryComponent } from './your-library/your-library.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    YourLibraryComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports:[HomeComponent]
})
export class DashboardModule { }
