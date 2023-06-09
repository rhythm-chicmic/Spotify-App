import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { PhoneAuthProvider, getAuth, signInWithCredential } from 'firebase/auth';
import { Firebase } from 'src/app/core/services/firebase.service';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit,OnDestroy{
  otp!:string;
  auth :any
  isDisable=true
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  }
  verify!:any;
  constructor(private addSongService:AddSongsService,private spinner:NgxSpinnerService,private router:Router,private ngZone:NgZone,private firebase:Firebase){
     this.auth = getAuth(firebase.firebaseApp);
  }
  ngOnInit(): void {
    this.addSongService.hideBottomIcon.next(false)
      this.verify = JSON.parse(localStorage.getItem(STORAGE_KEYS.VERIFICATION_ID) || '');
  }
  onOtpChange(otp: string) {

if(otp.length===6){
  this.isDisable=false;
    this.otp = otp;
  }
  else {
    this.isDisable=true;
  }
}

  handleClick() {
  
   const credential = PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

  
   
    signInWithCredential(this.auth,credential)
      .then((response:any) => {
        
        this.spinner.show();              
        localStorage.setItem('user_data', JSON.stringify(response));  //setting user details in the localStorage
        localStorage.setItem(STORAGE_KEYS.FIREBASE_ID, response.user.uid);

        localStorage.setItem(STORAGE_KEYS.TOKEN,response._tokenResponse?.idToken)
        this.ngZone.run(() => {
          this.Toast.fire({
            icon: 'success',
            title: 'Login Successful'
          })
          this.router.navigate([PATHS.MAIN.DASHBOARD]);
          
         
        });
      })
      .catch(() => {
   
        this.Toast.fire({
          icon: 'error',
          title: 'Wrong OTP/OTP Expired'
        })
      });
  }
  ngOnDestroy(): void {
    this.addSongService.hideBottomIcon.next(true)
  }

}


