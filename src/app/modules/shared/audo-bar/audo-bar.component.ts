import { Component, OnInit } from '@angular/core';
import { AddSongsService } from 'src/app/core/services/add-songs.service';

@Component({
  selector: 'app-audo-bar',
  templateUrl: './audo-bar.component.html',
  styleUrls: ['./audo-bar.component.scss']
})
export class AudoBarComponent implements OnInit{
  constructor(private allSongService:AddSongsService){}
audio_src!:string
ngOnInit(): void {
    this.allSongService.isPlayed$.subscribe((res)=>{
    this.audio_src=this.allSongService.audio.src
    console.log(this.audio_src)
    })
}
}
