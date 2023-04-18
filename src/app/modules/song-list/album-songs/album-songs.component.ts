import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { MostPlayedSongsService } from 'src/app/core/services/most-played-songs.service';
import { IMAGES } from 'src/app/common/constants';

@Component({
  selector: 'app-album-songs',
  templateUrl: './album-songs.component.html',
  styleUrls: ['./album-songs.component.scss']
})
export class AlbumSongsComponent implements OnInit{
  displayData:any;
  routeId!:string
  idList:any[]=[]
  allSongsList:any
  songsList:any[]=[]
  globalPlaySong=false
  defaultImage=IMAGES.ALBUM_IMAGE

  constructor(private activeRoute:ActivatedRoute,private addSongService:AddSongsService,private mostPlayedSongs:MostPlayedSongsService){}

  ngOnInit(): void {
    
    this.activeRoute?.params?.subscribe((res)=>{
      this.routeId=res['id']      //Route Id is sent to Firebase Api

    })
    this.addSongService.getAlbumById(this.routeId).subscribe((res)=>{
     
      this.displayData=res;
     
      this.idList=Object.values(res)[5]
      this.idList=Object.values(this.idList)


    })

    this.addSongService?.getAllSongs()?.subscribe((res:any)=>{
      this.allSongsList=Object.values(res)
 

      this.song()
    })
  }
  song(){
    for(const idlist of this.idList){
      for(const allsongs of this.allSongsList){
        if(idlist.id===allsongs.id){
          this.songsList.push(allsongs);
        }
      }
    }
    
  }

  onMouseLeave(index:number){
    this.songsList[index].isHovering=false;
  }
  onMouseOver(index:number){ 
    this.songsList[index].isHovering=true;
  }
  OnClickPlay(){
    this.globalPlaySong = !this.globalPlaySong
    if(this.globalPlaySong){
      this.addSongService.audio.play();
      this.addSongService.isPlayed$.next(true)
    }
    else{
      this.addSongService.audio.pause()
      this.addSongService.isPlayed$.next(false)

    }
  }


  PlaySong(url:string,index:number,songId:string,song:any){

    if(!this.addSongService.isPlayed$.getValue()){
    this.songsList[index].isPlayed=true;
      this.addSongService?.isPlayed$?.next(true);

    this.addSongService.audio.src =url;
    this.addSongService?.audio?.load()
    this.addSongService?.audio?.play();
    this.addSongService?.songImage$?.next(song?.imageUrl);
    this.addSongService?.songName$?.next(song?.songName);

    
    
 
    setTimeout(() => {
      this.mostPlayedSongs?.postMostPlayedSong(songId)?.subscribe()
    }, 30000);
  }
  else {

    this.songsList[index].isPlayed=false;
    
    this.addSongService.audio.src =url;
    this.addSongService?.audio?.load()
    this.addSongService?.audio?.play();
    this.addSongService?.songImage$?.next(song?.imageUrl);
    this.addSongService?.songName$?.next(song?.songName);
  
    setTimeout(() => {
      this.mostPlayedSongs?.postMostPlayedSong(songId)?.subscribe()
    }, 30000);
  }
  }

}
