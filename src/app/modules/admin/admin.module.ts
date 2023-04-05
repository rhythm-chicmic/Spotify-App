import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSongsComponent } from './add-songs/add-songs.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddSongsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
