import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IMAGES, PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { MostPlayedSongsService } from 'src/app/core/services/most-played-songs.service';
import { SongsLibraryService } from 'src/app/core/services/songs-library.service';
import { UserDetailsService } from 'src/app/core/services/user-details.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../../shared/edit-profile/edit-profile.component';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfleArray: any;
  isAdmin = false;
  documentId!:string
  totalLikedSongs: number = 0
  myFavouriteSong: any = []
  frequentPlayedSongs: any = []
  addProfile = true
  image = IMAGES.ADD_PROFILE_IMAGE
  phoneNo!: string
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
  constructor(private dialog:MatDialog,private AllSongsService: AddSongsService, private mostPlayedSongService: MostPlayedSongsService, private songLibraryService: SongsLibraryService, private spinner: NgxSpinnerService, private userService: UserDetailsService, private router: Router) {
    let user_data: any = localStorage.getItem(STORAGE_KEYS.UNIQUE_ID);
    user_data = JSON.parse(user_data);
    this.phoneNo = user_data.user.phoneNumber

  }
  ngOnInit(): void {
    this.spinner.show();
    this.userService.getMyProfile().subscribe((res:any) => {
      if(res){
      this.documentId= Object.keys(res)[0];
   
      res = Object.values(res)
      this.userProfleArray = res;
      
      this.addProfile = false;
      if (this.userProfleArray[0].email === 'rhythm.sharma@chicmic.co.in') {
        this.isAdmin = true;
      }
    }
      this.spinner.hide();  
    }, (e) => {
      if (e.status === 401) {
        this.Toast.fire({
          icon: 'error',
          title: 'Session Expired'
        })
        localStorage.clear();
        this.userService?.isLoggedIn$?.next(false)
        this.router.navigate([PATHS.AUTH.LOGIN])
      }
    })

    this.songLibraryService?.getMySongsList()?.subscribe((res: any) => {
      if(res){
      res = Object.values(res)
      this.totalLikedSongs = res.length
      }
    })

    this.mostPlayedSongService?.getMostPlayedSong()?.subscribe((res: any) => {
      if(res){
      res = Object.values(res);
      this.frequentPlayedSongs = res;

      const song = this.frequentPlayedSongs.sort((a: any, b: any) =>
        this.frequentPlayedSongs.filter((v: any) => v === a).length
        - this.frequentPlayedSongs.filter((v: any) => v === b).length).pop()

      this.AllSongsService?.getAllSongs()?.subscribe((res: any) => {
        res = Object.values(res);
        res.find((value: any) => {
          if (value.id === song?.songId) {
            this.myFavouriteSong = value;

          }
        })
      })
    }

    })


    setTimeout(() => {
      this.spinner.hide();
    }, 5000)
  }
  OnLogout() {
    localStorage.clear();
    this.userService?.isLoggedIn$?.next(false);
    this.router.navigate([PATHS.MAIN.DASHBOARD])
  }
  OnAddSongs() {
    this.router.navigate([PATHS.ADMIN.ADD_SONGS])
  }
  OnAddProfile() {
    this.router.navigate([PATHS.AUTH.REGISTER]);
  }
  OnTransaction() {
    this.router.navigate([PATHS.PAYMENT.TRANSACTION_HISTORY])
  }
  OnEditProfile() {
    const dialogRef = this.dialog.open(EditProfileComponent,{
      width:'940px',
      height:'700px',
     data:{data:this.userProfleArray, docId:this.documentId}
    })
    dialogRef.afterClosed().subscribe(()=>{
        this.userService.getMyProfile().subscribe((res:any)=>{
          res = Object.values(res)
        this.userProfleArray = res;
        })
    })
  }
  
}
