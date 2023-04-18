import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';

import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { UserDetailsService } from '../services/user-details.service';

@Injectable({
  providedIn: 'root'
})
export class IsprofileCreatedGuard implements CanActivate {
  userProfile!:boolean
  
  constructor(private route:Router,private userService:UserDetailsService){}
 



  canActivate(){  // checking if the data is present in localStorage 

      if(localStorage.getItem(STORAGE_KEYS.USER_PROFILE)==='True' || !localStorage.getItem(STORAGE_KEYS.TOKEN)){
        
        this.route.navigate([PATHS.MAIN.DASHBOARD])
     
        return false;
      }
      else if(localStorage.getItem(STORAGE_KEYS.USER_PROFILE)==='True' && localStorage.getItem(STORAGE_KEYS.TOKEN)){
        this.route.navigate([PATHS.MAIN.DASHBOARD])
     
        return false;
      }
      else{
        return true;
      }
  }
  
}
