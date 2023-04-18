import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { IMAGES } from 'src/app/common/constants';
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit{
  albumsArray:any[]=[]
  albumsRouteId:any[]=[]
  defaultImage=IMAGES.ALBUM_IMAGE
  constructor(private addSongService:AddSongsService,private router:Router){}

  ngOnInit(): void {
    this.addSongService.getAlbumDetails().subscribe((res:any)=>{    // getting all  the albums list
      if(res){
      this.albumsArray=Object.values(res)
      this.albumsRouteId=Object.keys(res)
      }
    })
  }
  OnAlbumClick(index:any){
    this.router.navigate([PATHS.MAIN.ALBUMS,this.albumsRouteId[index]])
  }

}
