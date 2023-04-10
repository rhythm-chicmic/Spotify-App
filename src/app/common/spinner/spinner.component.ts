import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  constructor(private spinner: NgxSpinnerService) { 
  
  }

  showSpinner() {
    this.spinner.show()
  }

  hideSpinner() {
    this.spinner.hide();
  }
}
