import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

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
  constructor(private service:AngularFirestore){}
  ngOnInit(): void {
    
    this.notesCollection=this.service.collection('notes');
    this.notes=this.notesCollection.valueChanges({idField:'id'})
   this.notesCollection.snapshotChanges().subscribe((res)=>console.log(res))
   
    this.notesCollection.valueChanges().subscribe((res)=>{
      console.log(res)
    
    }); //Observable to get the values


  }
   


}
