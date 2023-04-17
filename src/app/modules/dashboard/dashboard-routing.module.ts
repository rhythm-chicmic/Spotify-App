import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { HomeComponent } from './home/home.component';
import { YourLibraryComponent } from './your-library/your-library.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumSongsComponent } from '../song-list/album-songs/album-songs.component';


const routes: Routes = [
  {path:'',redirectTo:PATHS.MAIN.DASHBOARD,pathMatch:'full'},
  {path:PATHS.MAIN.DASHBOARD,component:HomeComponent},
  {path:PATHS.MAIN.YOUR_LIBRARY,canActivate:[AuthGuard],component:YourLibraryComponent},
  {path:PATHS.MAIN.PROFILE,canActivate:[AuthGuard],component:UserProfileComponent},
  {path:PATHS.MAIN.CREATE_PLAYLIST,canActivate:[AuthGuard],component:CreatePlaylistComponent},
  {path:PATHS.MAIN.ALBUMS,component:AlbumsComponent}
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
