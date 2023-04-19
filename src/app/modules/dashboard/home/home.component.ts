import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {  mergeMap } from 'rxjs';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { SongsLibraryService } from 'src/app/core/services/songs-library.service';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { UserDetailsService } from 'src/app/core/services/user-details.service';

import Swal from "sweetalert2"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // audio = new Audio
  searchTerm=''
  
  playSongs: any
  mySongList: any
  myPlaylistArray: any;
  myPlaylistIdArray: any
  songIdPresentInPlaylist: any
  purchasedSongArray:any
  token = true;
  flag = false;
  playlistFlag = false;
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
  constructor(private transactionService:TransactionService,private spinner: NgxSpinnerService, private router: Router, private service: AngularFirestore, private userService: UserDetailsService, private allSongService: AddSongsService, private songLibService: SongsLibraryService) {

    this.allSongService.getAllSongs().subscribe((res: any) => {     //All songs List will be displayed here
      this.playSongs = Object.values(res)
      this.transactionService.getPurchasedSong().subscribe((res)=>{
        if(res){
        this.purchasedSongArray=Object.values(res);
        
        for(const song of this.playSongs){
          for(const purchase of this.purchasedSongArray){ // locally handling if the user has already purchased
            if(song.id===purchase.songId){    // the song then set the song.payment to 'NO'
              song.payment='No'
            }
          }
        }
      }
      },()=>{
      localStorage.clear();       
      this.userService.isLoggedIn$.next(false);

    }
      )
      this.spinner.hide()
    },()=>{
    localStorage.clear()
  })
    if (localStorage.getItem(STORAGE_KEYS.TOKEN)) {
      this.token = false;
    }
    setTimeout(() => {
      this.spinner.hide()
    }, 3000);

  }
  search(value: string): void {             // search functionality is called
    this.playSongs = this.playSongs.filter((val:any) =>{    // filtering the songs based 
     if(val.songName.toLowerCase().includes(value)){    // on string of words included in the playSong Array
      return val;
     }
     else{
      return val
     }
    }
    );
  }
  ngOnInit(): void {
    this.spinner.show()

    this.songLibService.getMySongsList().subscribe((res: any) => {  // Method called to post songs to Liked List
      if(res){
      res = Object.values(res)
      this.mySongList = Object.values(res)
      }
    },()=>{
    localStorage.clear()
  }
    )
    this.songLibService.getAllPlaylists().subscribe((res) => {    // Method called to store songId to
      if(res){                                                    // specific playlist
      this.myPlaylistArray = Object.values(res);
      this.myPlaylistIdArray = Object.keys(res);
      }
    },()=>{})
  }

  SelectedSongToSend(index: number, songId: any,paid:any) { // On Playing  Paid song
    if(paid==='Yes'){                           //this method is called
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Song is Paid, please buy before Adding',
      })
    }
    else{
    this.songLibService.getSongToPlaylist(this.myPlaylistIdArray[index]).subscribe((res) => {


      this.songIdPresentInPlaylist = Object.values(res)
     
      this.songIdPresentInPlaylist.find((res: any) => {   // Method is checking if the user has already
        if (res.id === songId) {                         // added the song to the Playlist or not 
          this.Toast.fire({
            icon: 'info',
            title: 'Song Already Added'
          })
          this.playlistFlag = true;
         
        }
      })

      if (this.playlistFlag !== true) {
                                            // RxJs mergeMap function is used to wait  for all the http
        // requests to complete then execute the next line 
        this.songLibService.postSongToPlaylist(this.myPlaylistIdArray[index], songId).pipe(
          mergeMap(() => this.songLibService?.getSongToPlaylist(this.myPlaylistIdArray[index]))
        ).subscribe((res) => {
          this.songIdPresentInPlaylist = Object.values(res)
          this.Toast.fire({
            icon: 'success',
            title: 'Song Added to Playlist'
          })
        }
      ,()=>{})
        this.playlistFlag = false;
      }
    },()=>{}
    )

    this.playlistFlag = false;
  }
  }

  onClick(song: any) {              // checking if money is paid or not before playing the song
      if(song?.payment==='Yes'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Song is Paid, please buy before Adding',
        })
      }
      else{
    if (!this.mySongList) {
    

      if (localStorage.getItem(STORAGE_KEYS.TOKEN)) {

        

        this.songLibService.postMySongsList(song.id).pipe(
          mergeMap(() => this.songLibService?.getMySongsList()))
          .subscribe((res) => {
         
            this.mySongList = Object.values(res);
            this.Toast.fire({
              icon: 'success',
              title: 'Song Added '
            })

          },()=>{})
      }
      else {
        this.Toast.fire({
          icon: 'error',
          title: 'Login To Add Song'
        })
      }
    }
    else {

      this.mySongList.find((val: any) => {
        if (val.songId === song.id) {
          this.Toast.fire({
            icon: 'info',
            title: 'Song Already Added'
          })
          this.flag = true;
        }
      })

      if (this.flag !== true) {
        this.songLibService.postMySongsList(song.id).pipe(
          mergeMap(() => this.songLibService?.getMySongsList()))
          .subscribe((res) => {
            this.mySongList = Object.values(res)
            this.Toast.fire({
              icon: 'success',
              title: 'Song Added '
            })
        
          },()=>{})

      }
    }
    this.flag = false;
  }
}
  OnSignUp() {                                // signUp is called 
    this.router.navigate([PATHS.AUTH.LOGIN])
  }
  buySong(songId:any,amount:string){ 
    if(localStorage.getItem(STORAGE_KEYS.UNIQUE_ID)){ 
                                                          // route to the buy song page if you want to 
    this.transactionService.getSongData(songId,amount);  // purchase the song
    this.router.navigate([PATHS.PAYMENT.PAY_MONEY])
  }
  else{
    this.router.navigate([PATHS.AUTH.LOGIN])
  }
}

  playSong(url:any,songId:string,index:number,payment:string,playsong:any){
    if(payment==='No'){                     // song will be played if we click on playSong function
    this.playSongs[index].isPlayed=true;
    this.allSongService.audio.src=url
    this.allSongService?.audio?.load();
   
    if(!this.allSongService?.isPlayed$?.getValue()){

    this.allSongService?.audio.play();
    this.allSongService?.songImage$.next(playsong?.imageUrl);
    this.allSongService?.songName$.next(playsong?.songName)

    this.allSongService?.isPlayed$.next(true)
      

    }
    else {
      this.allSongService.isPlayed$.next(true)
    this.allSongService.audio.src=url
    this.allSongService?.audio.play();
    this.allSongService?.songImage$.next(playsong?.imageUrl);
    this.allSongService?.songName$.next(playsong?.songName)
    }
  }
  else {
    this.Toast.fire({
      icon: 'error',
      title: 'Buy this Song'
    })
  }
}
}
