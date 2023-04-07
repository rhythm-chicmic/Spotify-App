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
  myPlaylistArray:any;
  myPlaylistIdArray:any
  songIdPresentInPlaylist:any
  token:boolean=true;
  flag:boolean=false;
  playlistFlag:boolean=false;
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
      this.mySongList = Object.values(res)
    })
    this.songLibService.getAllPlaylists().subscribe((res)=>{
      this.myPlaylistArray=Object.values(res);
      this.myPlaylistIdArray=Object.keys(res);
      console.log(this.myPlaylistIdArray)
    })

    

  }

  SelectedSongToSend(index:number,songId:any){
    this.songLibService.getSongToPlaylist(this.myPlaylistIdArray[index]).subscribe((res)=>{
      this.songIdPresentInPlaylist=Object.values(res)
      console.log(this.songIdPresentInPlaylist)
      this.songIdPresentInPlaylist.find((res:any)=>{
        if(res.id===songId){
          this.Toast.fire({
            icon: 'info',
            title: 'Song Already Added'
          })
          this.playlistFlag=true;
          console.log(this.playlistFlag);
        }
      })

        if(this.playlistFlag!==true){
          console.log("Hello1")
    
            this.songLibService.postSongToPlaylist(this.myPlaylistIdArray[index],songId).pipe(
              mergeMap(res=>this.songLibService.getSongToPlaylist(this.myPlaylistIdArray[index]))
            ).subscribe((res)=>{
            this.songIdPresentInPlaylist=Object.values(res)
            this.Toast.fire({
              icon: 'success',
              title: 'Song Added to Liked Songs'
            })
            })
            this.playlistFlag=false;
          }
    })

            this.playlistFlag=false;

  }





  onClick(song:any){

    if(!this.mySongList){
      console.log(song.id)
      this.songLibService.postMySongsList(song.id).pipe(
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
      if(val.songId===song.id){
        this.Toast.fire({
          icon: 'info',
          title: 'Song Already Added'
        })
        this.flag=true;
      }
    })

      if(this.flag!==true){
        this.songLibService.postMySongsList(song.id).pipe(
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
