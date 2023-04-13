import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { APIS, SONG_LIBRARY, STORAGE_KEYS, userData } from 'src/app/common/constants';
import { songIdModel } from 'src/app/common/interfaces';
import { UserDetailsService } from './user-details.service';
@Injectable({
  providedIn: 'root'
})
export class SongsLibraryService {
  
  private path= environment.url
  token!:string;
   constructor(private httpService:HttpClient,private userService:UserDetailsService) {
   }
   postMySongsList(data:songIdModel){
  
    const targetId = {songId:data}
    return this.httpService.post(this.path+APIS.ALL_SONGS.MY_SONGS+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+SONG_LIBRARY.MY_LIKED_LIST+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),targetId)
   }

   getMySongsList(){
   
    if(localStorage.getItem(STORAGE_KEYS.TOKEN)){
      this.userService.isLoggedIn$.next(true);
    }
    return this.httpService.get(this.path+APIS.ALL_SONGS.MY_SONGS+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+SONG_LIBRARY.MY_LIKED_LIST+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
   }
   postCreatePlaylist(data:any){
    return this.httpService.post(this.path+APIS.ALL_SONGS.ADD_TO_PLAYLIST+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),data)
   }
   getAllPlaylists(){
   
    if(localStorage.getItem(STORAGE_KEYS.TOKEN)){
      this.userService.isLoggedIn$.next(true);
    }
 
    return this.httpService.get(this.path+APIS.ALL_SONGS.ADD_TO_PLAYLIST+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
   }
   getPlaylistById(documentId:string){
   
    return this.httpService.get(this.path+APIS.ALL_SONGS.ADD_TO_PLAYLIST+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'/'+documentId+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
   }
   postSongToPlaylist(documentId:string,songId:songIdModel){
    const targetId={id:songId}
    return this.httpService.post(this.path+APIS.ALL_SONGS.ADD_TO_PLAYLIST+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'/'+documentId+SONG_LIBRARY.SONG_ID+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),targetId)
   }
   getSongToPlaylist(documentId:string){
  
    return this.httpService.get(this.path+APIS.ALL_SONGS.ADD_TO_PLAYLIST+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'/'+documentId+SONG_LIBRARY.SONG_ID+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN));
   }

}
