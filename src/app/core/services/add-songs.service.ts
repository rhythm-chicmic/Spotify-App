import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { APIS, SONG_LIBRARY, STORAGE_KEYS } from 'src/app/common/constants';
import { BehaviorSubject } from 'rxjs';
import { MostPlayedSongsService } from './most-played-songs.service';
import Swal from 'sweetalert2'
import { UserDetailsService } from './user-details.service';
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

     }, ()=>{this.Toast.fire({
      icon: 'info',
      title: 'Not Logged In'
     })
     })
  }

 

 getAllSongs(){
     
    return this.httpService.get(this.path+APIS.ALL_SONGS.SONGS+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
 }
 postAllSongs(data:any){
  return this.httpService.post(this.path+APIS.ALL_SONGS.SONGS+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),data)
 }

 postAlbumDetails(data:any){
  return this.httpService.post(this.path+APIS.ALL_SONGS.ADD_TO_ALBUM+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),data)
 }

 postAlbumSongs(data:any,albumId:any){
  const targetId={id:data}
  return this.httpService.post(this.path+APIS.ALL_SONGS.ADD_TO_ALBUM+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'/'+albumId+SONG_LIBRARY.SONG_ID+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),targetId)
 }

 getAlbumDetails(){
  return this.httpService.get(this.path+APIS.ALL_SONGS.ADD_TO_ALBUM+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
 }

 getAlbumById(documentId:string){
  return this.httpService.get(this.path+APIS.ALL_SONGS.ADD_TO_ALBUM+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'/'+documentId+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN));
 }

}
