import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { STORAGE_KEYS } from 'src/app/common/constants';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { IMAGES } from 'src/app/common/constants';

@Component({
  selector: 'app-music-bar',
  templateUrl: './music-bar.component.html',
  styleUrls: ['./music-bar.component.scss']
})
export class MusicBarComponent implements OnInit {
  showing = true;
  volumeOfSong = true;
  songTime: any
  repeatSong = true
  songName!: string
  songImage!: string
  localSongsArray:any[]=[]
  demoImage = IMAGES.LIKED_SONGS_IMAGE
  constructor(private allSongsService: AddSongsService, private changeDetect: ChangeDetectorRef) {
    if (!localStorage.getItem(STORAGE_KEYS.TOKEN)) {
      this.showing = false;
    }


  }
  globalPlaySong = true


  ngOnInit(): void {
  
    
    this.allSongsService?.isPlayed$?.subscribe((res) => {   // this isPlayed$ is an Observable which 
                                              // checks if the song is Playing or not then it set the local variable to
      this.globalPlaySong = res;              // True/False

      if (res === true) {
        this.showing = true;
      }
    })
    this.allSongsService?.songImage$?.subscribe((res: any) => {   // GET song Image anywhere the song is played(Observable)
      this.songImage = res
    })
    this.allSongsService?.songName$?.subscribe((res: any) => {  //GET songName anywhere the song is Played(Observable)
      this.songName = res;
    })
  }

  onClick() {                                             // play/pause the song present in the 
    if (this.globalPlaySong) {                            // global Audio() function 
      this.allSongsService?.isPlayed$?.next(false);
      this.allSongsService?.audio?.pause()
    }
    else {
      this.allSongsService?.isPlayed$?.next(true);
      this.allSongsService?.audio?.play()
      this.songTime = this.allSongsService?.audio.currentTime;

    }
  }
  OnVolumeClick() {                                // Makes song volume to full and mute
    this.volumeOfSong = !this.volumeOfSong
    if (!this.volumeOfSong) {
      this.allSongsService.audio.volume = 0;
    }
    else {
      this.allSongsService.audio.volume = 1;

    }
  }
  onReplay() {                                   // This function will repeat the current song
    this.repeatSong = !this.repeatSong
    if (!this.repeatSong) {
      this.allSongsService.audio.loop = true;

    }
    else {
      this.allSongsService.audio.loop = false;
    }

  }

  OnCancel() {                      // show/hide the modal
    this.showing = !this.showing

  }

}
