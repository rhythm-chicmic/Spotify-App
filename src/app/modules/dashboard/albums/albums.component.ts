import { Component, OnInit } from '@angular/core';
import { AddSongsService } from 'src/app/core/services/add-songs.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit{
  constructor(private addSongService:AddSongsService){}

  ngOnInit(): void {
    this.addSongService.getAlbumDetails().subscribe((res:any)=>console.log(res))
  }


}
