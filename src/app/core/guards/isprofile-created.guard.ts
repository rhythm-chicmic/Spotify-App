import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { UserDetailsService } from '../services/user-details.service';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class IsprofileCreatedGuard implements CanActivate {
  userProfile!:boolean
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
  constructor(private route:Router,private userService:UserDetailsService){
      this.userService.userProfile$.subscribe((res)=>{
        this.userProfile=res;
      },(e)=>this.Toast.fire({
        icon: 'info',
        title: 'Not Logged In'
      }))
  
  }
 
  documentId:any


  canActivate(){

      if(this.userProfile){
     
        this.route.navigate([PATHS.MAIN.DASHBOARD])
     
        return false;
      }
      else{
      

        return true;
      }
  }
  
}
