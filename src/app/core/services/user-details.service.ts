import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIS, STORAGE_KEYS, userData } from 'src/app/common/constants';
import { signUpModel } from 'src/app/common/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private path= environment.url
 token!:string;
  constructor(private httpService:HttpClient) {
    console.log(userData)
  }
 
  postUserDetails(data:signUpModel){
    return this.httpService.post(this.path+APIS.AUTH.SIGNUP+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),data)
  }
  getUserDetails(){
    return this.httpService.get(this.path+APIS.AUTH.SIGNUP+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
  }

  getMyProfile(){
    return this.httpService.get(this.path+APIS.USER_PROFILE.MY_PROFILE+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
  }

}
