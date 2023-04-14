import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIS, STORAGE_KEYS } from 'src/app/common/constants';
import { signUpModel } from 'src/app/common/interfaces';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
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

  userProfile$=new BehaviorSubject<boolean>(true);
  private path= environment.url
 token!:string;
  constructor(private httpService:HttpClient) {
   this.getMyProfile().subscribe((res:any) => {
      if(res){
    
  
      this.userProfile$.next(true);
  
    }
    else {
   

      this.userProfile$.next(false);
    }
    },()=>this.Toast.fire({
      icon: 'info',
      title: 'Not Logged In'
    }))
  }
  isLoggedIn$ = new BehaviorSubject(localStorage.getItem(STORAGE_KEYS.TOKEN)?true:false);
 
  postUserDetails(data:signUpModel){
    return this.httpService.post(this.path+APIS.AUTH.SIGNUP+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),data)
  }
  getUserDetails(){
    this.isLoggedIn$.next(true);
    return this.httpService.get(this.path+APIS.AUTH.SIGNUP+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
  }

  getMyProfile(){
    this.isLoggedIn$.next(true);
    return this.httpService.get(this.path+APIS.USER_PROFILE.MY_PROFILE+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN))
  }

  putUserDetails(data:any,documentId:any){

    return this.httpService.patch(this.path+APIS.USER_PROFILE.MY_PROFILE+localStorage.getItem(STORAGE_KEYS.FIREBASE_ID)+'/'+documentId+'.json?auth='+localStorage.getItem(STORAGE_KEYS.TOKEN),data)

  }

}
