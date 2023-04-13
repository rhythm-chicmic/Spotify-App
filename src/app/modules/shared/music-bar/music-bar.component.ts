import { Component, Injectable, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AddSongsService } from 'src/app/core/services/add-songs.service';


@Component({
  selector: 'app-music-bar',
  templateUrl: './music-bar.component.html',
  styleUrls: ['./music-bar.component.scss']
})
export class MusicBarComponent implements OnInit{

  volumeOfSong=true;
  constructor(private allSongsService:AddSongsService){}
  globalPlaySong=true



  ngOnInit(): void {
    this.allSongsService.isPlayed$.subscribe((res)=>{
      console.log(res)
      this.globalPlaySong=res;
    })
  }

  onClick(){
    // this.globalPlaySong=!this.globalPlaySong
    if(this.globalPlaySong){
      this.allSongsService.isPlayed$.next(false);
      this.allSongsService.audio.pause()
      console.log(this.allSongsService.isPlayed$.getValue())
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

}
