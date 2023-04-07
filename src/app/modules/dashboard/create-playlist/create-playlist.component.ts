import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent {
  createPlaylistForm!:FormGroup
  selectedFile:any
  storagePath!:string
  imagePath!:string
  percentageVal!: Observable<number |null|undefined>;

  constructor(private fb:FormBuilder,private db:AngularFireDatabase,private storage:AngularFireStorage) {
    this.initCreatePlaylistForm();
  }
  initCreatePlaylistForm(){
    this.createPlaylistForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      imageUrl:['',Validators.required],
      createdAt:[''],
      songId:[''],
      playlistId:['']
    })
  }

  submitCreatePlaylist(){
    if(this.createPlaylistForm.valid){
      this.createPlaylistForm.value.createdAt=new Date();
      console.log(this.createPlaylistForm.value);
    }
  }

  selectFile(event:any,path:string){
    this.selectedFile=event.target?.files[0]
      this.storagePath=path
    this.upload();
}
upload(){
  const filePath = `${this.storagePath}/${this.selectedFile.name}`;
  const storageRef= this.storage.ref(filePath);
  const uploadTask = this.storage.upload(filePath,this.selectedFile);
  this.percentageVal = uploadTask.percentageChanges();

  uploadTask.snapshotChanges().pipe(
    finalize(()=>{
      storageRef.getDownloadURL().subscribe((downloadURL)=>{
        console.log(downloadURL)
        this.imagePath=downloadURL
      })
    })
  )





}

}
