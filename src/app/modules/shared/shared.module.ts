import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import  {SharedRoutingModule} from './shared-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatRadioModule} from '@angular/material/radio'; 

import {MatFormFieldModule} from '@angular/material/form-field'; 
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { MusicBarComponent } from './music-bar/music-bar.component';
import {MatTooltipModule} from '@angular/material/tooltip'; 
@NgModule({
  declarations: [
    NavbarComponent,
    EditProfileComponent,
    MusicBarComponent

  ],
  imports: [
    CommonModule,
    
    SharedRoutingModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  exports:[NavbarComponent,MusicBarComponent]
})
export class SharedModule { }
