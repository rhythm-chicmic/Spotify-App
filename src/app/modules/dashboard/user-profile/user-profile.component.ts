import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { UserDetailsService } from 'src/app/core/services/user-details.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  userProfleArray:any;
  isAdmin:boolean=false;
  addProfile:boolean=false
  constructor(private spinner :NgxSpinnerService,private userService:UserDetailsService,private router:Router){}
  ngOnInit(): void {
    this.spinner.show();
    this.userService.getMyProfile().subscribe((res)=>{
      res =Object.values(res)
      this.userProfleArray=res;
      if(!this.userProfleArray){
        this.addProfile=true;
      }
      console.log(res)
      if(this.userProfleArray[0].email==='rhythm.sharma@chicmic.co.in'){
        this.isAdmin=true;
      }
    this.spinner.hide();
    })

  }
  OnLogout(){
    localStorage.clear();
    this.userService.isLoggedIn$.next(false);
    this.router.navigate([PATHS.MAIN.DASHBOARD])
  }
  OnAddSongs(){
    this.router.navigate([PATHS.ADMIN.ADD_SONGS])
  }
  OnAddProfile(){
    this.router.navigate([PATHS.AUTH.REGISTER]);
  }
}
