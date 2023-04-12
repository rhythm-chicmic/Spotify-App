import { Component } from '@angular/core';
import { AddSongsService } from 'src/app/core/services/add-songs.service';

@Component({
  selector: 'app-music-bar',
  templateUrl: './music-bar.component.html',
  styleUrls: ['./music-bar.component.scss']
})
export class MusicBarComponent {
  constructor(private allSongsService:AddSongsService){}
  

}
