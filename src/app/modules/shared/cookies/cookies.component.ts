import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent {
  constructor(private router:Router){}
  OnClick(){
    this.router.navigate([PATHS.MAIN.DASHBOARD])
  }
}
