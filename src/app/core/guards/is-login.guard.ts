import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  constructor(private route:Router){}
  canActivate(){
      if(localStorage.getItem(STORAGE_KEYS.TOKEN)){
        this.route.navigate([PATHS.MAIN.DASHBOARD])
        return false;
      }
      else{
        return true;
      }
  }
  
}
