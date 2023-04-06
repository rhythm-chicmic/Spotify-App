import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLikedSongsComponent } from './my-liked-songs/my-liked-songs.component';
import { SongListRoutingModule } from './song-list-routing.module';
import { MyPlaylistSongsComponent } from './my-playlist-songs/my-playlist-songs.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 

@NgModule({
  declarations: [
    MyLikedSongsComponent,
    MyPlaylistSongsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SongListRoutingModule,
    MatButtonModule
  ],
  exports:[MyLikedSongsComponent]
})
export class SongListModule { }
