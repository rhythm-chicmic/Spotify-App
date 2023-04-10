import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner'
import { SpinnerComponent } from './spinner.component';
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner: NgxSpinnerService, private spinComponent:SpinnerComponent) { }

  showSpinner() {
    this.spinComponent.showSpinner()
  }

  hideSpinner() {
    this.spinComponent.hideSpinner();
  }
}
