import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { signUpModel } from 'src/app/common/interfaces';
import { APIS, STORAGE_KEYS, userData } from 'src/app/common/constants';
@Injectable({providedIn:'root'})
export class AddSongsService {
 private path= environment.url
 token!:string;
  constructor(private httpService:HttpClient) {
    console.log(userData)
  }
 
  postUserDetails(data:signUpModel){
    return this.httpService.post(this.path+APIS.AUTH.SIGNUP+localStorage.getItem(STORAGE_KEYS.TOKEN),data)
  }
  getUserDetails(){
   
    return this.httpService.get(this.path+APIS.AUTH.SIGNUP+localStorage.getItem(STORAGE_KEYS.TOKEN))
  
  }
}
