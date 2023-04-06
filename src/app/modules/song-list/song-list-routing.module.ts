import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { MyLikedSongsComponent } from './my-liked-songs/my-liked-songs.component';
import { MyPlaylistSongsComponent } from './my-playlist-songs/my-playlist-songs.component';




const routes: Routes = [
  {path:PATHS.MAIN.LIKED_SONGS,component:MyLikedSongsComponent},
  {path:PATHS.MAIN.PLAYLISTS,component:MyPlaylistSongsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongListRoutingModule { }
