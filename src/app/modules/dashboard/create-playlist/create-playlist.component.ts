import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent {
  createPlaylistForm!:FormGroup
  constructor(private fb:FormBuilder) {
    this.initCreatePlaylistForm();
  }
  initCreatePlaylistForm(){
    this.createPlaylistForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      imageUrl:['',Validators.required],
      createdAt:[''],
      songId:['']
    })
  }

  submitCreatePlaylist(){
    if(this.createPlaylistForm.valid){
      this.createPlaylistForm.value.createdAt=new Date();
      console.log(this.createPlaylistForm.value);
    }
  }
}
