import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { UserDetailsService } from 'src/app/core/services/user-details.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  isLogin=false;
constructor(private router :Router,private userService:UserDetailsService){
  
}


ngOnInit(): void {
  this.userService?.isLoggedIn$?.subscribe((res)=>{
    this.isLogin=res;
  })
}



  OnLogoClick(){
    this.router.navigate([PATHS.MAIN.DASHBOARD])
  }
  OnMyLibraryClick(){
    this.router.navigate([PATHS.MAIN.YOUR_LIBRARY])
  }
  OnLikedSongsClick(){
    this.router.navigate([PATHS.MAIN.YOUR_LIBRARY,PATHS.MAIN.LIKED_SONGS])
  }
  OnProfileClick(){
    this.router.navigate([PATHS.MAIN.PROFILE])
  }
  OnCreatePlaylistClick(){
    this.router.navigate([PATHS.MAIN.CREATE_PLAYLIST])
  }
  OnPrivacyPolicyClick(){
      this.router.navigate([PATHS.SHARED.PRIVACY_POLICY])
  }
  OnCookiesClick(){
    this.router.navigate([PATHS.SHARED.COOKIES])
  }
}
