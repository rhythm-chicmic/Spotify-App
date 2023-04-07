import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongsLibraryService } from 'src/app/core/services/songs-library.service';

@Component({
  selector: 'app-my-playlist-songs',
  templateUrl: './my-playlist-songs.component.html',
  styleUrls: ['./my-playlist-songs.component.scss']
})
export class MyPlaylistSongsComponent implements OnInit{
  isHovering:boolean=false
  globalPlaySong:boolean=true
  songsList:any=[]
  routeId!:string
  constructor(private activeRoute:ActivatedRoute,private songLibraryService:SongsLibraryService){}

  ngOnInit(){
    this.activeRoute.params.subscribe((res)=>{
      this.routeId=res['id']      //Route Id is sent to Firebase Api
    })
    this.songLibraryService.getPlaylistById(this.routeId).subscribe((res)=>{
      console.log(res)
    })
  }




  onMouseLeave(index:number){
    // this.songsList[index].isHovering=false;
  }
  onMouseOver(index:number){ 
    // this.songsList[index].isHovering=true;
  }
  OnClickPlay(){
    this.globalPlaySong = !this.globalPlaySong
  }
}
