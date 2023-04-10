import { Component, OnInit, NgZone } from '@angular/core';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { PATHS, STORAGE_KEYS, userData } from 'src/app/common/constants';
import { PhoneAuthProvider, getAuth, signInWithCredential } from 'firebase/auth';
import { Firebase } from 'src/app/core/services/firebase.service';
import Swal from 'sweetalert2'
import { SpinnerService } from 'src/app/common/spinner/spinner.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit{
  otp!:string;
  auth :any
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
  constructor(private spinner:NgxSpinnerService,private router:Router,private ngZone:NgZone,private firebase:Firebase){
     this.auth = getAuth(firebase.firebaseApp);
  }
  ngOnInit(): void {
      this.verify = JSON.parse(localStorage.getItem(STORAGE_KEYS.VERIFICATION_ID) || '{}');
  }
  onOtpChange(otp: string) {
    this.otp = otp;
  }

  handleClick() {
    console.log(this.otp);
   var credential = PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

    console.log(credential);
   
    signInWithCredential(this.auth,credential)
      .then((response:any) => {
        console.log(response);
        this.spinner.show();
        localStorage.setItem('user_data', JSON.stringify(response));
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
      .catch((error) => {
        console.log(error);
        this.Toast.fire({
          icon: 'error',
          title: 'Wrong OTP/OTP Expired'
        })
      });
  }

}


