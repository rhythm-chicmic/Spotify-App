import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { YourLibraryComponent } from './your-library/your-library.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component'; 
@NgModule({
  declarations: [
    HomeComponent,
    YourLibraryComponent,
    UserProfileComponent,
    CreatePlaylistComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ],
  exports:[HomeComponent]
})
export class DashboardModule { }
