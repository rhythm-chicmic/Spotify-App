import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SongsLibraryService } from 'src/app/core/services/songs-library.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { PATHS, REGEX } from 'src/app/common/constants';
import { EventTrackService } from 'src/app/core/services/event-track.service';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit,OnDestroy{
  createPlaylistForm!:FormGroup
  selectedFile:any
  storagePath!:string
  imagePath!:string
  percentageVal!: Observable<number |null|undefined>;
//Toster
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

  constructor(private addSongService:AddSongsService,private eventService:EventTrackService,private router:Router,private fb:FormBuilder,private db:AngularFireDatabase,private storage:AngularFireStorage,private songLibraryService:SongsLibraryService) {
    this.initCreatePlaylistForm();
  }

  ngOnInit(): void {
    this.addSongService.hideBottomIcon.next(false)
  }


  initCreatePlaylistForm(){                     //defining form structure
    this.createPlaylistForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      imageUrl:['',[Validators.required,Validators.pattern(REGEX.IMAGE)]],
      createdAt:[''],
      songId:[''],
      playlistId:['']
    })
  }

  submitCreatePlaylist(){               //Post request called for submitting form
    if(this.createPlaylistForm.valid){
      this.createPlaylistForm.value.createdAt=new Date();
      this.createPlaylistForm.value.imageUrl=this.imagePath
      this.createPlaylistForm.value.playlistId=this.createPlaylistForm?.value?.title.slice(0,2)+this.createPlaylistForm?.value?.description.slice(0,2)+JSON.stringify(this.createPlaylistForm?.value?.createdAt).slice(8,25)
  
      this.songLibraryService.postCreatePlaylist(this.createPlaylistForm.value).subscribe(()=>{
 
        this.Toast.fire({
          icon: 'success',
          title: 'PLaylist Created Successfully'
        }).then(()=>{
          this.eventService.postPlaylistTrack(this.createPlaylistForm.value.playlistId).subscribe()
        })
        this.router.navigate([PATHS.MAIN.YOUR_LIBRARY]);
      })
    }
  }

  selectFile(event:any,path:string){          // getting file details uploaded by the user
    this.selectedFile=event.target?.files[0]
      this.storagePath=path
      
    this.upload();
}
get controls(){               // form control setup
  return this.createPlaylistForm.controls;
}


upload(){                     // uploading files to firebase storage
  const filePath = `${this.storagePath}/${this.selectedFile?.name}`;
  const storageRef= this.storage?.ref(filePath);
  const uploadTask = this.storage?.upload(filePath,this.selectedFile);
  this.percentageVal = uploadTask.percentageChanges();

  uploadTask.snapshotChanges().pipe(
    finalize(()=>{
      storageRef.getDownloadURL().subscribe((downloadURL)=>{
     
        this.imagePath=downloadURL
      })
    })
  ).subscribe()





}
ngOnDestroy(): void {
  this.addSongService.hideBottomIcon.next(true)
  
}
}
