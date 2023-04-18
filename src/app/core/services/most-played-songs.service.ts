import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIS, STORAGE_KEYS } from 'src/app/common/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MostPlayedSongsService {
  private path= environment.url
  constructor(private httpService:HttpClient) { }

/// posting song Id 

  postMostPlayedSong(data:string){
    const target={songId:data}
    return this.httpService.post(this.path+APIS.MOST_PLAYED_SONGS.POST_PLAYED_SONGS+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),target)
  }

// get list of most played songs

  getMostPlayedSong(){
    return this.httpService.get(this.path+APIS.MOST_PLAYED_SONGS.POST_PLAYED_SONGS+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
  }

}
