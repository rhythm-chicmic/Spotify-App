import { Component } from '@angular/core';

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
