import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddSongsService } from 'src/app/core/services/add-songs.service';

@Component({
  selector: 'app-add-songs',
  templateUrl: './add-songs.component.html',
  styleUrls: ['./add-songs.component.scss']
})
export class AddSongsComponent {
  addSongForm!:FormGroup
  constructor(private fb:FormBuilder,private addSongService:AddSongsService){
    this.initAddSongForm();
    this.addSongService.getAllSongs().subscribe((res)=>console.log(Object.keys(res)))
  }
  initAddSongForm(){
    this.addSongForm = this.fb.group({
      songName:['',Validators.required],
      songType:['',Validators.required],
      genre:['',Validators.required],
      artistName:['',Validators.required],
      id:['']

    })
  }

  addSong(){
      if(this.addSongForm.valid){
        console.log(this.addSongForm.value);
        this.addSongForm.value.id = this.addSongForm.value.songName.slice(0,2)+this.addSongForm.value.songType.slice(0,2)+this.addSongForm.value.genre.slice(0,2)+this.addSongForm.value.artistName.slice(0,2)
        console.log(this.addSongForm.value)
        this.addSongService.postAllSongs(this.addSongForm.value).subscribe((res:any)=>{
          console.log(res);
        })
      }
  }

}
