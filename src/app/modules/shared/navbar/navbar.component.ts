import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

constructor(private router :Router){}
  OnLogoClick(){
    this.router.navigate([PATHS.MAIN.DASHBOARD])
  }
  OnMyLibraryClick(){
    this.router.navigate([PATHS.MAIN.YOUR_LIBRARY])
  }
  OnLikedSongsClick(){
    this.router.navigate([PATHS.MAIN.YOUR_LIBRARY,PATHS.MAIN.LIKED_SONGS])
  }
  OnProfileClick(){
    this.router.navigate([PATHS.MAIN.PROFILE])
  }
  OnCreatePlaylistClick(){
    this.router.navigate([PATHS.MAIN.CREATE_PLAYLIST])
  }
}
