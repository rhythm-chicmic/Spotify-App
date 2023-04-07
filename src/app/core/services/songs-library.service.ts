import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { APIS, SONG_LIBRARY, STORAGE_KEYS, userData } from 'src/app/common/constants';
@Injectable({
  providedIn: 'root'
})
export class SongsLibraryService {
  private path= environment.url
  token!:string;
   constructor(private httpService:HttpClient) {
     console.log(userData)
   }
   postMySongsList(data:any){
    return this.httpService.post(this.path+APIS.ALL_SONGS.MY_SONGS+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+SONG_LIBRARY.MY_LIKED_LIST+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),data)
   }

   getMySongsList(){
    return this.httpService.get(this.path+APIS.ALL_SONGS.MY_SONGS+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+SONG_LIBRARY.MY_LIKED_LIST+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
   }

}
