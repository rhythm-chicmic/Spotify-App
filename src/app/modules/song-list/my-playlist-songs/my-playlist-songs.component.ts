import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
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
  displayData:any;
  allSongsList:any
  IdList:any=[]
  routeId!:string
  isPlayed:boolean=false
  audio = new Audio
  songTime:any=''
  constructor(private activeRoute:ActivatedRoute,private songLibraryService:SongsLibraryService,private addSongService:AddSongsService){}

  ngOnInit(){
    this.activeRoute.params.subscribe((res)=>{
      this.routeId=res['id']      //Route Id is sent to Firebase Api
    })
    this.songLibraryService.getPlaylistById(this.routeId).subscribe((res)=>{
     this.displayData=res
      this.IdList=Object.values(res)[4]
      this.IdList=Object.values(this.IdList)
    })
    this.addSongService.getAllSongs().subscribe((res:any)=>{
      this.allSongsList=Object.values(res)
      this.song()
    })
  }

  song(){
    for(let idlist of this.IdList){
      for(let allsongs of this.allSongsList){
        if(idlist.id===allsongs.id){
          this.songsList.push(allsongs);
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

  PlaySong(url:string,index:number){
    console.log(url,index)
    this.songsList[index].isPlayed=true;


    this.audio.src =url;
    this.audio.load()
    this.audio.play();
    this.songTime = this.audio.currentTime;
    console.log(this.songTime)
  }
  StopSong(index:number){
 
    this.songsList[index].isPlayed=false;
    this.audio.pause();
    
  }


}
