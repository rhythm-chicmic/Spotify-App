import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { APIS, STORAGE_KEYS } from 'src/app/common/constants';
@Injectable({
  providedIn: 'root'
})
export class EventTrackService {
  private path= environment.url
  constructor(private httpService:HttpClient) {}


// posting the playlist id 
  postPlaylistTrack(data:string){
    const target={playlistId:data}
    return this.httpService.post(this.path+APIS.EVENT_TRACK.PLAYLIST_TRACK+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),target)
  }

// counting how many times the particular playlist is played
  getPlaylistTrack(){
    return this.httpService.get(this.path+APIS.EVENT_TRACK.PLAYLIST_TRACK+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
  }
}
