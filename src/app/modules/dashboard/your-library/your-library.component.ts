import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { SongsLibraryService } from 'src/app/core/services/songs-library.service';

@Component({
  selector: 'app-your-library',
  templateUrl: './your-library.component.html',
  styleUrls: ['./your-library.component.scss']
})
export class YourLibraryComponent implements OnInit{
  myPlaylists:any;
  myPlaylistRouteId:any
  constructor(private router:Router,private songLibraryService:SongsLibraryService){}

  ngOnInit(){
    this.songLibraryService.getAllPlaylists().subscribe((res)=>{
      this.myPlaylists= Object.values(res);
      this.myPlaylistRouteId= Object.keys(res);
    

    })
  }




  OnLikedSongsClick(){
    this.router.navigate([PATHS.MAIN.YOUR_LIBRARY,PATHS.MAIN.LIKED_SONGS])
  }
  OnMyPlaylistClick(index:number){
    this.router.navigate([PATHS.MAIN.YOUR_LIBRARY,PATHS.MAIN.PLAYLIST,this.myPlaylistRouteId[index]])
  }
}
