import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { SongsLibraryService } from 'src/app/core/services/songs-library.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventTrackService } from 'src/app/core/services/event-track.service';
import { MostPlayedSongsService } from 'src/app/core/services/most-played-songs.service';
import Swal from 'sweetalert2'
import { PATHS } from 'src/app/common/constants';
import { IMAGES } from 'src/app/common/constants';
import { UserDetailsService } from 'src/app/core/services/user-details.service';
@Component({
  selector: 'app-my-playlist-songs',
  templateUrl: './my-playlist-songs.component.html',
  styleUrls: ['./my-playlist-songs.component.scss']
})
export class MyPlaylistSongsComponent implements OnInit{
  imageUrl=IMAGES.ALBUM_IMAGE
  isHovering=false
  globalPlaySong=false
  playlistPlayed=0
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
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  constructor(private userService:UserDetailsService,private router:Router,private mostPlayedSongs:MostPlayedSongsService,private eventService:EventTrackService,private spinner:NgxSpinnerService,private activeRoute:ActivatedRoute,private songLibraryService:SongsLibraryService,private addSongService:AddSongsService){}

  ngOnInit(){
    this.spinner.show();

  



    this.activeRoute?.params?.subscribe((res)=>{
      this.routeId=res['id']      //Route Id is sent to Firebase Api
    })
    this.songLibraryService?.getPlaylistById(this.routeId).subscribe((res:any)=>{ // GET method for getting playlists
     this.displayData=res
     this.playlistId= res.playlistId
      this.IdList=Object.values(res)[4]
      this.IdList=Object.values(this.IdList)

      this.eventService?.getPlaylistTrack()?.subscribe((res:any)=>{
        res =Object.values(res);

        res.filter((res:any)=>{
          if(res.playlistId===this.playlistId){
            this.playlistPlayed++;
      
          }
        })
        
        

      })
  


    },()=>{
      this.Toast.fire({
        icon:'error',
        title:'Session Expired, Please login Again'
      })
    localStorage.clear();
    this.userService.isLoggedIn$.next(false)
    this.router.navigate([PATHS.AUTH.LOGIN])
    }
    )
    this.addSongService?.getAllSongs()?.subscribe((res:any)=>{  //GET method for fetching all songs
      this.allSongsList=Object.values(res)
    this.spinner.hide();

      this.song()
    })
  }

  song(){                                              // filtering songs, to get the specific songs 
    for(const idlist of this.IdList){                 // present in the playlist
      for(const allsongs of this.allSongsList){
        if(idlist.id===allsongs.id){
          this.songsList.push(allsongs);
        }
      }
    }
    
  }

  onMouseLeave(index:number){                      // De-highLighting the hovered song
    this.songsList[index].isHovering=false;
  }
  onMouseOver(index:number){                       // highLighting the hovered song
    this.songsList[index].isHovering=true;
  }
  OnClickPlay(){                                    // Play button is clicked which will play the active song     
    this.globalPlaySong = !this.globalPlaySong      // url present in 'audio.src'
     
    this.addSongService.audio.src = this.songsList[0]?.mp3File
    this.addSongService?.songImage$?.next(this.songsList[0]?.imageUrl);
    this.addSongService?.songName$?.next(this.songsList[0]?.songName);
    if(this.globalPlaySong){
      this.addSongService.audio.play();
      this.addSongService.isPlayed$.next(true)
    }
    else{
      this.addSongService.audio.pause()
      this.addSongService.isPlayed$.next(false)

    }
  }

  PlaySong(url:string,index:number,songId:string,song:any){    // This will play the song on which
                                                                 // we click, which takes mp3 url and songID  
    if(!this.addSongService.isPlayed$.getValue()){            // to store it in the global this.audio file
    this.songsList[index].isPlayed=true;                      // to play/pause song
      this.addSongService?.isPlayed$?.next(true);

    this.addSongService.audio.src =url;
    this.addSongService?.audio?.load()
    this.addSongService?.audio?.play();
    this.songTime = this.audio?.currentTime;
    this.addSongService?.songImage$?.next(song?.imageUrl);
    this.addSongService?.songName$?.next(song?.songName);

    
    
    setTimeout(() => {
      this.eventService?.postPlaylistTrack(this.playlistId)?.subscribe(()=>{
 
        this.playlistPlayed++;
      })
    }, 25000);
    setTimeout(() => {
      this.mostPlayedSongs?.postMostPlayedSong(songId)?.subscribe()
    }, 30000);
  }
  else {

    this.songsList[index].isPlayed=false;
    this.addSongService.audio.src =url;
    this.addSongService?.audio?.load()
    this.addSongService?.audio?.play();
    this.addSongService?.songImage$?.next(song?.imageUrl);
    this.addSongService?.songName$?.next(song?.songName);
    this.addSongService.isPlayed$.next(true)
    setTimeout(() => {
      this.eventService?.postPlaylistTrack(this.playlistId)?.subscribe(()=>{
 
        this.playlistPlayed++;
      })
    }, 25000);
    setTimeout(() => {
      this.mostPlayedSongs?.postMostPlayedSong(songId)?.subscribe()
    }, 30000);
  }
  } 
  StopSong(index:number){                             // stop on playing song
    if(this.addSongService?.isPlayed$?.getValue()){   // function is not used 
    this.songsList[index].isPlayed=false;
    this.audio.pause();
    this.addSongService?.isPlayed$?.next(false);
    }
    else{
      this.addSongService?.isPlayed$?.next(true)
      this.addSongService?.audio?.play();
    }
    
  }


}
