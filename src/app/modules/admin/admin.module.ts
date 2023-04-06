import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSongsComponent } from './add-songs/add-songs.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AddSongsComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
