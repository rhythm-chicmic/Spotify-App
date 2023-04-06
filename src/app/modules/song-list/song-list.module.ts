import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLikedSongsComponent } from './my-liked-songs/my-liked-songs.component';
import { SongListRoutingModule } from './song-list-routing.module';
import { MyPlaylistSongsComponent } from './my-playlist-songs/my-playlist-songs.component';


@NgModule({
  declarations: [
    MyLikedSongsComponent,
    MyPlaylistSongsComponent
  ],
  imports: [
    CommonModule,
    SongListRoutingModule
  ],
  exports:[MyLikedSongsComponent]
})
export class SongListModule { }
