import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { SongsLibraryService } from 'src/app/core/services/songs-library.service';

@Component({
  selector: 'app-my-liked-songs',
  templateUrl: './my-liked-songs.component.html',
  styleUrls: ['./my-liked-songs.component.scss']
})
export class MyLikedSongsComponent implements OnInit{
  songsList:any
  isHovering:boolean=false
  globalPlaySong:boolean=true
  constructor(private router:Router,private songLibService:SongsLibraryService){}

  ngOnInit(): void {
    this.songLibService.getMySongsList().subscribe((res:any)=>{
      res=Object.values(res)
      console.log(res)
      this.songsList=res;
    })
  }


  onMouseLeave(index:number){
    this.songsList[index].isHovering=false;
  }
  onMouseOver(index:number){ 
    this.songsList[index].isHovering=true;
  }
  OnClickPlay(){
    this.globalPlaySong = !this.globalPlaySong
  }
}
