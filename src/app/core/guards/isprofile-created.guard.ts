import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { UserDetailsService } from '../services/user-details.service';

@Injectable({
  providedIn: 'root'
})
export class IsprofileCreatedGuard implements CanActivate {
  userProfile!:boolean
  constructor(private route:Router,private userService:UserDetailsService){
      this.userService.userProfile$.subscribe((res)=>{
        this.userProfile=res;
      })
  
  }
 
  documentId:any


  canActivate(){

      if(this.userProfile){
        console.log(this.userProfile)
        this.route.navigate([PATHS.MAIN.DASHBOARD])
     
        return false;
      }
      else{
        console.log(this.userProfile)

        return true;
      }
  }
  
}
