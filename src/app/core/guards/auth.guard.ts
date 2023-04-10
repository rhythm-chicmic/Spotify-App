import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route:Router){}
  canActivate(){
      if(localStorage.getItem(STORAGE_KEYS.TOKEN)){
        return true;
      }
      else{
        this.route.navigate([PATHS.MAIN.DASHBOARD])
        return false;
      }
  }

  
}
