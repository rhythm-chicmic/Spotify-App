import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddSongsService } from 'src/app/core/services/add-songs.service';

@Component({
  selector: 'app-my-liked-songs',
  templateUrl: './my-liked-songs.component.html',
  styleUrls: ['./my-liked-songs.component.scss']
})
export class MyLikedSongsComponent implements OnInit{
  songsList:any
  isHovering:boolean=false
  constructor(private router:Router,private allSongService:AddSongsService){}

  ngOnInit(): void {
    this.allSongService.getMySongsList().subscribe((res:any)=>{
      res=Object.values(res)
      console.log(res)
      this.songsList=res;
    })
  }


  onMouseLeave(index:number){
    this.songsList[index].isHovering=false;
  }
  onMouseOver(index:number){ 
    this.songsList[index].isHovering=true;

  }
}
