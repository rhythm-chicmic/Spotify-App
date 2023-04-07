import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { SongsLibraryService } from 'src/app/core/services/songs-library.service';
import { UserDetailsService } from 'src/app/core/services/user-details.service';
import Swal from "sweetalert2"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit{

  playSongs:any
  mySongList:any
  token:boolean=true;
  flag:boolean=false;
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
  constructor(private router:Router,private service:AngularFirestore,private userService:UserDetailsService,private allSongService:AddSongsService,private songLibService:SongsLibraryService){
    this.userService.getUserDetails().subscribe((res:any)=>{
      // console.log(Object.values(res))
  })
    this.allSongService.getAllSongs().subscribe((res:any)=>{
      this.playSongs=Object.values(res)
    })
    if(localStorage.getItem(STORAGE_KEYS.TOKEN)){
      this.token=false;
    }

  }
  ngOnInit(): void {

    this.songLibService.getMySongsList().subscribe((res:any)=>{
      res = Object.values(res)
      console.log(res)
      this.mySongList = Object.values(res)
    })

  }
  onClick(song:any){
   console.log(1);

    if(!this.mySongList){
      this.songLibService.postMySongsList(song).pipe(
        mergeMap(res=>this.songLibService.getMySongsList()))
        .subscribe((res)=>{
          console.log(res)
          this.mySongList=Object.values(res);
          this.Toast.fire({
            icon: 'success',
            title: 'Song Added to Liked Songs'
          })
          console.log(this.mySongList)

        })
      
    }
    else {

    this.mySongList.find((val:any)=>{
      if(val.id===song.id){
        this.Toast.fire({
          icon: 'info',
          title: 'Song Already Added'
        })
        this.flag=true;
      }
    })

      if(this.flag!==true){
        this.songLibService.postMySongsList(song).pipe(
          mergeMap(res=>this.songLibService.getMySongsList()))
          .subscribe((res)=>{
            this.mySongList = Object.values(res)
            this.Toast.fire({
              icon: 'success',
              title: 'Song Added to Liked Songs'
            })
            console.log(this.mySongList)
          })

      }
    }
      this.flag=false;
  }
  OnSignUp(){
    this.router.navigate([PATHS.AUTH.LOGIN])
  }


}
