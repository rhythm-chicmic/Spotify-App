import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/core/services/user-details.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  userProfleArray:any;
  constructor(private userService:UserDetailsService){}
  ngOnInit(): void {
    this.userService.getMyProfile().subscribe((res)=>{
      res =Object.values(res)
      this.userProfleArray=res;
      console.log(res)
    })
  }

}
