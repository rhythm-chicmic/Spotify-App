import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
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
  constructor(private router:Router,private service:AngularFirestore,private userService:UserDetailsService,private allSongService:AddSongsService){
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
    
    this.allSongService.getMySongsList().subscribe((res:any)=>{
      this.mySongList = Object.values(res)
    })

  }
  onClick(song:any){
   console.log(1);
   
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
        this.allSongService.postMySongsList(song).pipe(
          mergeMap(res=>this.allSongService.getMySongsList()))
          .subscribe((res)=>{
            this.mySongList = Object.values(res)
            console.log(this.mySongList)
          })
      
      }
      this.flag=false;
  }
  OnSignUp(){
    this.router.navigate([PATHS.AUTH.LOGIN])
  }


}
