import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { APIS, STORAGE_KEYS } from 'src/app/common/constants';
import { BehaviorSubject } from 'rxjs';
import { MostPlayedSongsService } from './most-played-songs.service';
import Swal from 'sweetalert2'
@Injectable({providedIn:'root'})
export class AddSongsService {
 private path= environment.url
 songImage$ = new BehaviorSubject<string>('');
 songName$ = new BehaviorSubject<string>('');
 audio = new Audio
 isPlayed$ = new BehaviorSubject<boolean>(false);
 globalPlaySong$= new BehaviorSubject<boolean>(true);
 frequentPlayedSongs:any
 token!:string;
 myFavouriteSong:any
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
  constructor(private httpService:HttpClient, private mostPlayedSongService: MostPlayedSongsService) {
   this.mostPlayedSongService.getMostPlayedSong().subscribe((res:any)=>{
      if(res){
         res = Object.values(res);
         this.frequentPlayedSongs = res;
         const song = this.frequentPlayedSongs.sort((a: any, b: any) =>
           this.frequentPlayedSongs.filter((v: any) => v === a).length
           - this.frequentPlayedSongs.filter((v: any) => v === b).length).pop()
    
           this.getAllSongs().subscribe((res: any) => {
            res = Object.values(res);
            res.find((value: any) => {
              if (value.id === song?.songId) {
                this.myFavouriteSong = value?.mp3File
               this.audio.src=this.myFavouriteSong
                this.songImage$.next(value?.imageUrl);
                this.songName$.next(value?.songName);
             
              }
            })
          })


      }

     }, (e)=>this.Toast.fire({
      
     }) )
  }

 

 getAllSongs(){
     
    return this.httpService.get(this.path+APIS.ALL_SONGS.SONGS+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
 }
 postAllSongs(data:any){
  return this.httpService.post(this.path+APIS.ALL_SONGS.SONGS+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),data)
 }

}
