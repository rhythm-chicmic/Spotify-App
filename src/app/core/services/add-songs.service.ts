import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { APIS, STORAGE_KEYS, userData } from 'src/app/common/constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn:'root'})
export class AddSongsService {
 private path= environment.url
 audio = new Audio
 isPlayed$ = new BehaviorSubject(false);
 token!:string;
  constructor(private httpService:HttpClient) {
  }
 getAllSongs(){
     
    return this.httpService.get(this.path+APIS.ALL_SONGS.SONGS+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
 }
 postAllSongs(data:any){
  return this.httpService.post(this.path+APIS.ALL_SONGS.SONGS+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),data)
 }

}
