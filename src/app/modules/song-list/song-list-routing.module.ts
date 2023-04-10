import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { MyLikedSongsComponent } from './my-liked-songs/my-liked-songs.component';
import { MyPlaylistSongsComponent } from './my-playlist-songs/my-playlist-songs.component';
import { YourLibraryComponent } from '../dashboard/your-library/your-library.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';




const routes: Routes = [
  {path:PATHS.MAIN.YOUR_LIBRARY,canActivate:[AuthGuard], children:[
    {path:'',component:YourLibraryComponent},
    {path:PATHS.MAIN.LIKED_SONGS,component:MyLikedSongsComponent},
    {path:PATHS.MAIN.PLAYLISTS,component:MyPlaylistSongsComponent}
  ]}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongListRoutingModule { }
