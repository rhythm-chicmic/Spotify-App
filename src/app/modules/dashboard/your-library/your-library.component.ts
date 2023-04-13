import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PATHS } from 'src/app/common/constants';
import { SongsLibraryService } from 'src/app/core/services/songs-library.service';
import { IMAGES } from 'src/app/common/constants';
import Swal from 'sweetalert2'
import { UserDetailsService } from 'src/app/core/services/user-details.service';
@Component({
  selector: 'app-your-library',
  templateUrl: './your-library.component.html',
  styleUrls: ['./your-library.component.scss']
})
export class YourLibraryComponent implements OnInit{
  myPlaylists:any;
  myPlaylistRouteId:any
  imageUrl=IMAGES.LIKED_SONGS_IMAGE
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
  constructor(private userService:UserDetailsService,private spinner:NgxSpinnerService,private router:Router,private songLibraryService:SongsLibraryService){}

  ngOnInit(){
    this.spinner.show();
    this.songLibraryService?.getAllPlaylists()?.subscribe((res)=>{
      if(res){
      this.myPlaylists= Object.values(res);
      this.myPlaylistRouteId= Object.keys(res);
      
    this.spinner.hide();
      }
    }, (e) => {
      if (e.status === 401) {
        this.Toast.fire({
          icon: 'error',
          title: 'Session Expired'
        })
        localStorage.clear();
        this.userService?.isLoggedIn$?.next(false);
        this.router.navigate([PATHS.AUTH.LOGIN])
      }
    })
    setTimeout(()=>{
      this.spinner.hide();
        },3000)
  }




  OnLikedSongsClick(){
    this.router.navigate([PATHS.MAIN.YOUR_LIBRARY,PATHS.MAIN.LIKED_SONGS])
  }
  OnMyPlaylistClick(index:number){
    this.router.navigate([PATHS.MAIN.YOUR_LIBRARY,PATHS.MAIN.PLAYLIST,this.myPlaylistRouteId[index]])
  }
}
