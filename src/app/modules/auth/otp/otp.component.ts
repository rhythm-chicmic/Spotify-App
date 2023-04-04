import { Component, OnInit, NgZone } from '@angular/core';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { PhoneAuthProvider, getAuth, signInWithCredential } from 'firebase/auth';
import { Firebase } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit{
  otp!:string;
  auth :any
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
  constructor(private router:Router,private ngZone:NgZone,private firebase:Firebase){
     this.auth = getAuth(firebase.app);
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
      .then((response) => {
        console.log(response);
        localStorage.setItem('user_data', JSON.stringify(response));
        this.ngZone.run(() => {
          this.router.navigate([PATHS.MAIN.DASHBOARD]);
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }

}


