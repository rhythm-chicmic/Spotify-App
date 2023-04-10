import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { Observable, finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { IS_SONG_PAID, REGEX } from 'src/app/common/constants';
@Component({
  selector: 'app-add-songs',
  templateUrl: './add-songs.component.html',
  styleUrls: ['./add-songs.component.scss']
})
export class AddSongsComponent {
  addSongForm!:FormGroup
  selectedFile:any
  storagePath!:string
  imagePath!:string
  mp3Path!:string
  percentageVal!: Observable<number |null|undefined>;
  isPaid=IS_SONG_PAID
  paidValue!:string
  // Track file uploading with snapshot

  constructor(private db:AngularFireDatabase,private storage:AngularFireStorage,private fb:FormBuilder,private addSongService:AddSongsService){
    this.initAddSongForm();
    this.addSongService.getAllSongs().subscribe((res)=>console.log(Object.keys(res)))
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
      payment:['',Validators.required],
      amount:['0',[Validators.pattern(REGEX.NUMBER_GREATER_THAN_0_OR_EQUAL_TO_ZERO)]]
    })
  }



    selectFile(event:any,path:string){
      this.selectedFile=event.target?.files[0]
        this.storagePath=path
      this.upload();
  }

  get controls(){
    return this.addSongForm.controls;
  }

   upload(){
    const filePath = `${this.storagePath}/${this.selectedFile.name}`;
    const storageRef= this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath,this.selectedFile);
    this.percentageVal = uploadTask.percentageChanges();
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          if(this.storagePath==='/images'){
            this.imagePath=downloadURL
            console.log(this.storagePath,1)

          }
          else{
            this.mp3Path=downloadURL;
            console.log(this.storagePath,2)

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
        console.log(this.addSongForm.value);


        this.addSongForm.value.id = this.addSongForm?.value?.songName.slice(0,2)+this.addSongForm?.value?.songType.slice(0,2)+this.addSongForm?.value?.genre.slice(0,2)+this.addSongForm?.value?.artistName.slice(0,2)
        console.log(this.addSongForm.value)
        this.addSongService.postAllSongs(this.addSongForm.value).subscribe((res:any)=>{
          console.log(res);
 

        })
      }
  }

  onChange(event:any){
   
    this.paidValue=event
  }


}
