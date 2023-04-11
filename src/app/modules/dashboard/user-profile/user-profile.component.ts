import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IMAGES, PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { UserDetailsService } from 'src/app/core/services/user-details.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  userProfleArray:any;
  isAdmin=false;
  addProfile=true
  image=IMAGES.ADD_PROFILE_IMAGE
  phoneNo!:string
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
  constructor(private spinner :NgxSpinnerService,private userService:UserDetailsService,private router:Router){
    let user_data:any=localStorage.getItem(STORAGE_KEYS.UNIQUE_ID);
     user_data = JSON.parse(user_data);
     this.phoneNo=user_data.user.phoneNumber
    
  }
  ngOnInit(): void {
    this.spinner.show();
    this.userService.getMyProfile().subscribe((res)=>{
      res =Object.values(res)
      this.userProfleArray=res;
      this.addProfile=false;

      console.log(res)
      if(this.userProfleArray[0].email==='rhythm.sharma@chicmic.co.in'){
        this.isAdmin=true;
      }
    this.spinner.hide();
    }, (e) => {
      if (e.status === 401) {
        this.Toast.fire({
          icon: 'error',
          title: 'Session Expired'
        })
        localStorage.clear();
       
      }
    })
    setTimeout(()=>{
      this.spinner.hide();
        },5000)
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
  OnTransaction(){
      this.router.navigate([PATHS.PAYMENT.TRANSACTION_HISTORY])
  }
  OnEditProfile(){
    console.log("Edit Profile")
  }
}
