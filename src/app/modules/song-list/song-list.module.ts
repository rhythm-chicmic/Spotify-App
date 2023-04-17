import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLikedSongsComponent } from './my-liked-songs/my-liked-songs.component';
import { SongListRoutingModule } from './song-list-routing.module';
import { MyPlaylistSongsComponent } from './my-playlist-songs/my-playlist-songs.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlbumSongsComponent } from './album-songs/album-songs.component';

@NgModule({
  declarations: [
    MyLikedSongsComponent,
    MyPlaylistSongsComponent,
    AlbumSongsComponent,

  ],
  imports: [
    CommonModule,
    MatIconModule,
    NgxSpinnerModule,
    SongListRoutingModule,
    MatButtonModule
  ],
  exports:[MyLikedSongsComponent]
})
export class SongListModule { }
