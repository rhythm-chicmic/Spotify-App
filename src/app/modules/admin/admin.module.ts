import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSongsComponent } from './add-songs/add-songs.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AddAlbumsComponent } from './add-albums/add-albums.component';
import { NgxFileDropModule } from 'ngx-file-drop';
@NgModule({
  declarations: [
    AddSongsComponent,
    AddAlbumsComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    FormsModule
  ]
})
export class AdminModule { }
