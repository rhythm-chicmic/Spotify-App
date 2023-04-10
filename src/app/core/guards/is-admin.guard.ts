import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private route:Router){}
  canActivate(){
    if(localStorage.getItem('id')==='ooemnYMf6vXSlkSuFhH9bc95QnD3'){
      return true;
    }
    else{
      this.route.navigate([PATHS.MAIN.DASHBOARD])
      return false;
    }
}
  
}
