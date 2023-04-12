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
import { DeleteComponent } from './delete/delete.component';
@NgModule({
  declarations: [
    NavbarComponent,
    EditProfileComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  exports:[NavbarComponent]
})
export class SharedModule { }
