import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

constructor(private router :Router){}
  OnLogoClick(){
    this.router.navigate([PATHS.MAIN.DASHBOARD])
  }
  OnMyLibraryClick(){
    this.router.navigate([PATHS.MAIN.YOUR_LIBRARY])
  }
}
