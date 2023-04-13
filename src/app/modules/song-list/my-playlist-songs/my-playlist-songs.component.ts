import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { SongsLibraryService } from 'src/app/core/services/songs-library.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventTrackService } from 'src/app/core/services/event-track.service';
import { MostPlayedSongsService } from 'src/app/core/services/most-played-songs.service';
@Component({
  selector: 'app-my-playlist-songs',
  templateUrl: './my-playlist-songs.component.html',
  styleUrls: ['./my-playlist-songs.component.scss']
})
export class MyPlaylistSongsComponent implements OnInit{
  isHovering=false
  globalPlaySong=true
  playlistPlayed:number=0
  songsList:any=[]
  playlistId!:string
  displayData:any;
  allSongsList:any
  IdList:any=[]
  routeId!:string
  isPlayed=false
  timesPlaylistPlayed:any;
  audio = new Audio
  songTime:any=''
  constructor(private mostPlayedSongs:MostPlayedSongsService,private eventService:EventTrackService,private spinner:NgxSpinnerService,private activeRoute:ActivatedRoute,private songLibraryService:SongsLibraryService,private addSongService:AddSongsService){}

  ngOnInit(){
    this.spinner.show();

   
    



    this.activeRoute.params.subscribe((res)=>{
      this.routeId=res['id']      //Route Id is sent to Firebase Api
    })
    this.songLibraryService.getPlaylistById(this.routeId).subscribe((res:any)=>{
     this.displayData=res
     this.playlistId= res.playlistId
      this.IdList=Object.values(res)[4]
      this.IdList=Object.values(this.IdList)

      this.eventService.getPlaylistTrack().subscribe((res:any)=>{
        res =Object.values(res);

        res.filter((res:any)=>{
          if(res.playlistId===this.playlistId){
            this.playlistPlayed++;
      
          }
        })
        
        

      })
  


    })
    this.addSongService.getAllSongs().subscribe((res:any)=>{
      this.allSongsList=Object.values(res)
    this.spinner.hide();

      this.song()
    })
  }

  song(){
    for(const idlist of this.IdList){
      for(const allsongs of this.allSongsList){
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

  PlaySong(url:string,index:number,songId:string,song:any){

    if(!this.addSongService.isPlayed$.getValue()){
    this.songsList[index].isPlayed=true;
      this.addSongService.isPlayed$.next(true);

    this.addSongService.audio.src =url;
    this.addSongService.audio.load()
    this.addSongService.audio.play();
    this.songTime = this.audio.currentTime;
    this.addSongService?.songImage$.next(song?.imageUrl);
    this.addSongService?.songName$.next(song?.songName);

    
    
    setTimeout(() => {
      this.eventService.postPlaylistTrack(this.playlistId).subscribe((res)=>{
 
        this.playlistPlayed++;
      })
    }, 25000);
    setTimeout(() => {
      this.mostPlayedSongs.postMostPlayedSong(songId).subscribe()
    }, 30000);
  }
  else {
    this.addSongService.isPlayed$.next(false);
    this.songsList[index].isPlayed=false;
    this.addSongService.audio.pause()
  }
  }
  StopSong(index:number){
    if(this.addSongService.isPlayed$.getValue()){
    this.songsList[index].isPlayed=false;
    this.audio.pause();
    this.addSongService.isPlayed$.next(false);
    }
    else{
      this.addSongService.isPlayed$.next(true)
      this.addSongService.audio.play();
    }
    
  }


}
