import { Component, Injectable, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AddSongsService } from 'src/app/core/services/add-songs.service';


@Component({
  selector: 'app-music-bar',
  templateUrl: './music-bar.component.html',
  styleUrls: ['./music-bar.component.scss']
})
export class MusicBarComponent implements OnInit{
  showing=true;
  volumeOfSong=true;
  repeatSong=true
  songName!:string
  songImage!:string
  constructor(private allSongsService:AddSongsService){}
  globalPlaySong=true
  ngOnInit(): void {
    this.allSongsService.isPlayed$.subscribe((res)=>{
      
      this.globalPlaySong=res;
    })
    this.allSongsService.songImage$.subscribe((res:any)=>{
      this.songImage=res
    })
    this.allSongsService.songName$.subscribe((res:any)=>{
      this.songName=res;
    })
  }

  onClick(){
    if(this.globalPlaySong){
      this.allSongsService.isPlayed$.next(false);
      this.allSongsService.audio.pause()
    }
    else{
      this.allSongsService.isPlayed$.next(true);
      this.allSongsService.audio.play()
    }
  }
  OnVolumeClick(){
    this.volumeOfSong=!this.volumeOfSong
    if(!this.volumeOfSong){
      this.allSongsService.audio.volume=0;
    }
    else{
      this.allSongsService.audio.volume=1;

    }
  }
  onReplay(){
      this.repeatSong=!this.repeatSong
      if(!this.repeatSong){
    this.allSongsService.audio.loop=true;

      }
      else{
    this.allSongsService.audio.loop=false;
      }

  }

  OnCancel(){
    this.showing=!this.showing
  }
}