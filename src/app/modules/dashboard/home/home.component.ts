import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { UserDetailsService } from 'src/app/core/services/user-details.service';

interface Note{
  content:string,
  hearts:number,
  id?:string
 }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

  

export class HomeComponent implements OnInit{
  notesCollection!:AngularFirestoreCollection<Note>;
  notes!:Observable<Note[]>
  constructor(private service:AngularFirestore,private userService:UserDetailsService){
    this.userService.getUserDetails().subscribe((res:any)=>console.log(Object.values(res)))
  }
  ngOnInit(): void {
    
    this.notesCollection=this.service.collection('notes');
    this.notes=this.notesCollection.valueChanges({idField:'id'})
   this.notesCollection.snapshotChanges().subscribe((res)=>console.log(res))
   
    this.notesCollection.valueChanges().subscribe((res)=>{
      console.log(res)
    
    }); //Observable to get the values


  }
   


}
