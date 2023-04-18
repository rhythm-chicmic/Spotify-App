import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { Observable, finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { IS_SONG_PAID, PATHS, REGEX } from 'src/app/common/constants';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-songs',
  templateUrl: './add-songs.component.html',
  styleUrls: ['./add-songs.component.scss']
})
export class AddSongsComponent implements OnInit{
  addSongForm!:FormGroup
  selectedFile:any
  storagePath!:string
  imagePath!:string
  mp3Path!:string
  percentageVal!: Observable<number |null|undefined>;
  isPaid=IS_SONG_PAID
  paidValue!:string
  // Track file uploading with snapshot
  
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

  constructor(private router:Router,private db:AngularFireDatabase,private storage:AngularFireStorage,private fb:FormBuilder,private addSongService:AddSongsService){
    this.initAddSongForm();
    this.addSongService.getAllSongs().subscribe()
  }
  initAddSongForm(){
    this.addSongForm = this.fb.group({
      songName:['',Validators.required],
      songType:['',Validators.required],
      genre:['',Validators.required],
      artistName:['',Validators.required],
      id:[''],
      created:[''],
      imageUrl:['',[Validators.required,Validators.pattern(REGEX.IMAGE)]],
      mp3File:['',[Validators.required,Validators.pattern(REGEX.MP3)]],
      payment:[''],
      amount:['0']
    })
  }

  ngOnInit(): void {
    Swal.fire({
      icon: 'info',
      title: 'Want to Create Album',
      text: 'Click here',
        showDenyButton: true,
      
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result)=>{
      if (result.isConfirmed) {
        this.router.navigate([PATHS.ADMIN.ADD_ALBUMS])
      } else if (result.isDenied) {
        Swal.close()
      }
    })
  }


    selectFile(event:any,path:string){
      this.selectedFile=event.target?.files[0]
      console.log(this.selectedFile)
        this.storagePath=path
      this.upload();
  }

  get controls(){
    return this.addSongForm.controls;
  }

   upload(){
    const filePath = `${this.storagePath}/${this.selectedFile.name}`;
    const storageRef= this.storage?.ref(filePath);
    const uploadTask = this.storage?.upload(filePath,this.selectedFile);
    this.percentageVal = uploadTask?.percentageChanges();
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          if(this.storagePath==='/images'){
            this.imagePath=downloadURL
         

          }
          else{
            this.mp3Path=downloadURL;
    


          }

        });
      })
    ).subscribe();


   }

  addSong(){
    
      if(this.addSongForm.valid){

        this.addSongForm.value.created= new Date()
        this.addSongForm.value.imageUrl=this.imagePath
        this.addSongForm.value.mp3File=this.mp3Path
  

        this.addSongForm.value.id = this.addSongForm?.value?.songName.slice(0,3)+this.addSongForm?.value?.songType.slice(0,3)+this.addSongForm?.value?.genre.slice(0,2)+this.addSongForm?.value?.artistName.slice(0,4)

        this.addSongService.postAllSongs(this.addSongForm.value).subscribe(()=>{
      
          this.Toast.fire({
            icon: 'success',
            title: 'Song Added to List'
          }).then(()=>{
              this.router.navigate([PATHS.MAIN.DASHBOARD])
          })
      


        })
      }
  }

  onChange(event:any){
   
    this.paidValue=event
  }


}
