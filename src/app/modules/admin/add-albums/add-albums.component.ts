import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';

 const songDetails=[
  {artistName:'11',created:'',genre:'',id:'',mp3File:'',payment:'No',songName:'',songType:'',imageUrl:''}
]

@Component({
  selector: 'app-add-albums',
  templateUrl: './add-albums.component.html',
  styleUrls: ['./add-albums.component.scss']
})
export class AddAlbumsComponent {
  addAlbum!:FormGroup
  public files: any[] = [];
  musicData:any=[];
  openDropBox=false;
  selectedFile:any
  storagePath='/mp3'
  mp3Path!:string;
  albumId!:string
  percentageVal!: Observable<number |null|undefined>;

  constructor(private router:Router,private addSongService:AddSongsService,private fb:FormBuilder,private storage:AngularFireStorage){
    this.initAddAlbum();
  }
  initAddAlbum(){
    this.addAlbum= this.fb.group({
      albumName:['',Validators.required],
      songType:['',Validators.required],
      genre:['',Validators.required],
      artistName:['',Validators.required],
      albumId:[''],
      created:[''],
      songId:['']
    })

  }








  OnAlbumCreate(){
    if(this.addAlbum.valid){
      this.addAlbum.value.created = new Date();
      this.addAlbum.value.albumId=this.addAlbum?.value?.albumName.slice(0,2)+this.addAlbum?.value?.songType.slice(0,2)+JSON.stringify(this.addAlbum?.value?.created).slice(8,25)
      console.log(this.addAlbum.value)
   songDetails[0].artistName=this.addAlbum?.value?.artistName;
   songDetails[0].genre=this.addAlbum?.value?.genre;
   songDetails[0].created=this.addAlbum?.value?.created
   songDetails[0].songType=this.addAlbum?.value?.songType
   
      this.openDropBox=true;
      this.addSongService.postAlbumDetails(this.addAlbum.value).subscribe((res:any)=>{
        // console.log(res);
        this.albumId=res.name
        this.addAlbum.disable;
      });
    }
  }


 
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    

    for (const droppedFile of files) {
      console.log(1)
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
        
          // Here you can access the real file
          this.upload(file);

          this.musicData.push(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  upload(file:any){
    const filePath = `${this.storagePath}/${file.name}`;
    const storageRef= this.storage?.ref(filePath);
    const uploadTask = this.storage?.upload(filePath,file);
    this.percentageVal = uploadTask?.percentageChanges();
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
            this.mp3Path=downloadURL;
            // console.log(this.mp3Path)
            songDetails[0].mp3File=this.mp3Path
            songDetails[0].songName=file.name
            songDetails[0].id= songDetails[0]?.songName.slice(0,3)+songDetails[0].songType.slice(0,3)+songDetails[0]?.genre.slice(0,2)+songDetails[0]?.artistName.slice(0,4)
            this.addSongService.postAllSongs(songDetails[0]).subscribe(()=>{
              // console.log(res.name)
              this.addSongService.postAlbumSongs(songDetails[0].id,this.albumId).subscribe((res)=>console.log(res))
            })

          });
      })
    ).subscribe();

   }

   OnAddSongs(){
    this.router.navigate([PATHS.MAIN.ALBUMS]);
   }


 
  public fileOver(event:any){
    console.log(event);
  }
 
  public fileLeave(event:any){
    console.log(event);
  }

}
