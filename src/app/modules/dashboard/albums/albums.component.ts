import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { AddSongsService } from 'src/app/core/services/add-songs.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit{
  albumsArray:any[]=[]
  albumsRouteId:any[]=[]
  constructor(private addSongService:AddSongsService,private router:Router){}

  ngOnInit(): void {
    this.addSongService.getAlbumDetails().subscribe((res:any)=>{
      this.albumsArray=Object.values(res)
      this.albumsRouteId=Object.keys(res)
      console.log(this.albumsRouteId)
    })
  }
  OnAlbumClick(index:any){
    this.router.navigate([PATHS.MAIN.ALBUMS,this.albumsRouteId[index]])
  }
  // this.router.navigate([PATHS.MAIN.YOUR_LIBRARY,PATHS.MAIN.PLAYLIST,this.myPlaylistRouteId[index]])

}
