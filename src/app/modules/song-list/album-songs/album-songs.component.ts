import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { MostPlayedSongsService } from 'src/app/core/services/most-played-songs.service';
import { IMAGES } from 'src/app/common/constants';

@Component({
  selector: 'app-album-songs',
  templateUrl: './album-songs.component.html',
  styleUrls: ['./album-songs.component.scss']
})
export class AlbumSongsComponent implements OnInit {
  displayData: any;
  routeId!: string
  idList: any[] = []
  allSongsList: any
  songsList: any[] = []
  globalPlaySong = false
  defaultImage = IMAGES.ALBUM_IMAGE

  constructor(private activeRoute: ActivatedRoute, private addSongService: AddSongsService, private mostPlayedSongs: MostPlayedSongsService) { }

  ngOnInit(): void {

    this.activeRoute?.params?.subscribe((res) => {
      this.routeId = res['id']      //Route Id is sent to Firebase Api

    })
    this.addSongService.getAlbumById(this.routeId).subscribe((res) => { // get specific album by id
                                                                        // getting from activated route
      this.displayData = res;

      this.idList = Object.values(res)[5]
      this.idList = Object.values(this.idList)


    })

    this.addSongService?.getAllSongs()?.subscribe((res: any) => { // we got songId from album list
      this.allSongsList = Object.values(res)                      // now traversing the allSongsList to
                                                                  // filter out the songs that are present
                                                                  // in the album
      this.song()
    })
  }
  song() {                                                    // this function is called for filtering
    for (const idlist of this.idList) {
      for (const allsongs of this.allSongsList) {
        if (idlist.id === allsongs.id) {
          this.songsList.push(allsongs);
        }
      }
    }

  }

  onMouseLeave(index: number) {                   // De-highLighting the song on hover
    this.songsList[index].isHovering = false;
  }
  onMouseOver(index: number) {                   // highLighting the song on hover
    this.songsList[index].isHovering = true;  
  }
  OnClickPlay() {                               // Play music on clicking the play button and toggle play 
    this.globalPlaySong = !this.globalPlaySong  // and pause button
    if (this.globalPlaySong) {                  // i.e recently played song will be played not any song 
      this.addSongService.audio.play();         // which is present
      this.addSongService.isPlayed$.next(true)
    }
    else {
      this.addSongService.audio.pause()
      this.addSongService.isPlayed$.next(false)

    }
  }


  PlaySong(url: string, index: number, songId: string, song: any) { // this passes songId and mp3 url
                                                              // to set audio player to play the song 
    if (!this.addSongService.isPlayed$.getValue()) {          // and rest are similar functionality as that of
      this.songsList[index].isPlayed = true;                  // onClickPlay() function
      this.addSongService?.isPlayed$?.next(true);

      this.addSongService.audio.src = url;
      this.addSongService?.audio?.load()
      this.addSongService?.audio?.play();
      this.addSongService?.songImage$?.next(song?.imageUrl);
      this.addSongService?.songName$?.next(song?.songName);




      setTimeout(() => {
        this.mostPlayedSongs?.postMostPlayedSong(songId)?.subscribe() // This setTimeout() will call after
      }, 30000);  // 30sec to post the recently played song to DB 
    }
    else {

      this.songsList[index].isPlayed = false;

      this.addSongService.audio.src = url;
      this.addSongService?.audio?.load()
      this.addSongService?.audio?.play();
      this.addSongService?.songImage$?.next(song?.imageUrl);
      this.addSongService?.songName$?.next(song?.songName);

      setTimeout(() => {
        this.mostPlayedSongs?.postMostPlayedSong(songId)?.subscribe() // same for this function as mentioned
      }, 30000);                                                      // above
    }
  }

}
