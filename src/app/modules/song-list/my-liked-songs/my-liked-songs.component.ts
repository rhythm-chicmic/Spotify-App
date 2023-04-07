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
  allSongsList:any
  songsList:any=[]
  IdList:any
  isHovering:boolean=false
  globalPlaySong:boolean=true
  constructor(private router:Router,private songLibService:SongsLibraryService,private addSongService:AddSongsService){}

  ngOnInit(): void {
    this.songLibService.getMySongsList().subscribe((res:any)=>{
      res=Object.values(res)
      console.log(res)
      this.IdList=res;
      this.addSongService.getAllSongs().subscribe((res:any)=>{
        this.allSongsList=Object.values(res)
        this.song()
      })
    })
  }

  song(){
    for(let idlist of this.IdList){
      for(let allsongs of this.allSongsList){
        if(idlist.songId===allsongs.id){
          console.log(typeof allsongs);
          this.songsList.push(allsongs);
          console.log(this.songsList)
        }
      }
    }
    
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
