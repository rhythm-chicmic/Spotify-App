import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';

@Component({
  selector: 'app-your-library',
  templateUrl: './your-library.component.html',
  styleUrls: ['./your-library.component.scss']
})
export class YourLibraryComponent {

  constructor(private router:Router){}

  OnLikedSongsClick(){
    this.router.navigate([PATHS.MAIN.LIKED_SONGS])
  }
  OnMyPlaylistClick(){
    this.router.navigate([PATHS.MAIN.PLAYLIST,'1'])
  }
}
