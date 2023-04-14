import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { UserDetailsService } from '../services/user-details.service';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class IsprofileCreatedGuard implements CanActivate {
  userProfile!:boolean
  
  constructor(private route:Router,private userService:UserDetailsService){}
 



  canActivate(){

      if(localStorage.getItem('userProfile')==='True' || !localStorage.getItem(STORAGE_KEYS.TOKEN)){
        
        this.route.navigate([PATHS.MAIN.DASHBOARD])
     
        return false;
      }
      else if(localStorage.getItem('userProfile')==='True' && localStorage.getItem(STORAGE_KEYS.TOKEN)){
        this.route.navigate([PATHS.MAIN.DASHBOARD])
     
        return false;
      }
      else{
        return true;
      }
  }
  
}
