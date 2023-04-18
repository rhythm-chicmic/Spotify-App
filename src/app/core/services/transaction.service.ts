import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { APIS, STORAGE_KEYS } from 'src/app/common/constants';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
songId!:string
amount!:string
private path= environment.url
 token!:string;
  constructor(private httpService:HttpClient) { }
  getSongData(id:string,amount:string){
    this.songId=id
    this.amount=amount
  }

  // post the purchased song details
  postPurchasedSong(data:any){
    return this.httpService.post(this.path+APIS.TRANSACTION.POST_SONG_BUY_DATA+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),data)
  } 

  // get list of purchased songs

  getPurchasedSong(){
    return this.httpService.get(this.path+APIS.TRANSACTION.GET_SONG_BUY_DATA+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
  }
}
