import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import 'firebase/database'
import { UserDetailsService } from './core/services/user-details.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotifyClone';
  // isLogin:boolean=false;
  constructor(private userService:UserDetailsService){}
  // ngOnInit(){
  //   this.userService.isLoggedIn$.subscribe((res)=>{
  //     this.isLogin=res
  //   })
  // }
}
