import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { SongsLibraryService } from 'src/app/core/services/songs-library.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IMAGES, PATHS } from 'src/app/common/constants';
import Swal from 'sweetalert2'
import { MostPlayedSongsService } from 'src/app/core/services/most-played-songs.service';
import { UserDetailsService } from 'src/app/core/services/user-details.service';
@Component({
  selector: 'app-my-liked-songs',
  templateUrl: './my-liked-songs.component.html',
  styleUrls: ['./my-liked-songs.component.scss']
})
export class MyLikedSongsComponent implements OnInit{
  allSongsList:any
  songsList:any=[]
  IdList:any
  isPlayed=true
  globalPlaySong=true
  // audio = new Audio
  imageUrl=IMAGES.LIKED_SONGS_BANNER_IMAGE
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
  constructor(private userService:UserDetailsService,private mostPlayedSongService:MostPlayedSongsService,private spinner:NgxSpinnerService,private router:Router,private songLibService:SongsLibraryService,private addSongService:AddSongsService){}

  ngOnInit(): void {
    


    this.spinner.show();
    this.songLibService.getMySongsList().subscribe((res:any)=>{
      if(res){
      res=Object.values(res)
      }
    this.spinner.hide();

      this.IdList=res;
      this.addSongService.getAllSongs().subscribe((res:any)=>{
        if(res){
        this.allSongsList=Object.values(res)
        this.song()
        }
        this.spinner.hide();

      
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
    setTimeout(()=>{
      this.spinner.hide();
    },5000)
  }

  song(){
    if(this.IdList){
    for(const idlist of this.IdList){
      for(const allsongs of this.allSongsList){
        if(idlist.songId===allsongs.id){
         
          this.songsList.push(allsongs);
         
        }
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
    this.addSongService.audio.src =url;
    this.addSongService?.audio?.load()
    this.addSongService?.audio?.play();
      this.addSongService?.songImage$?.next(song?.imageUrl);
      this.addSongService?.songName$?.next(song?.songName);
    this.addSongService?.isPlayed$.next(true);
    setTimeout(() => {
      this.mostPlayedSongService.postMostPlayedSong(songId).subscribe()
    }, 30000);
  }
  else {
    this.addSongService.audio.src =url;
    this.addSongService?.audio?.load()
    this.addSongService?.audio?.play();
      this.addSongService?.songImage$?.next(song?.imageUrl);
      this.addSongService?.songName$?.next(song?.songName);

    this.songsList[index].isPlayed=false;
    setTimeout(() => {
      this.mostPlayedSongService?.postMostPlayedSong(songId)?.subscribe()
    }, 30000);


  }
  }
  StopSong(index:number){
       
     
    if(this.addSongService?.isPlayed$?.getValue()){
   

    this.songsList[index].isPlayed=false;
    this.addSongService?.audio?.pause();
    this.addSongService?.isPlayed$?.next(false);
  }
  else {
    this.addSongService?.audio?.play();
    this.songsList[index].isPlayed=true;
    this.addSongService?.isPlayed$?.next(true)
  }
  }
}
