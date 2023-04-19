import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PATHS, REGEX, STORAGE_KEYS } from 'src/app/common/constants';
import { getAuth,RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import "firebase/firestore"
import { Router } from '@angular/router';
import { Firebase } from 'src/app/core/services/firebase.service';
import Swal from "sweetalert2"
import { AddSongsService } from 'src/app/core/services/add-songs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy{

  auth:any
  flag=false;
  alert=false;
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
  recaptchaVerifier:any
  LoginForm!: FormGroup
  constructor(private fb:FormBuilder,private router :Router,private firebase:Firebase,private addSongService:AddSongsService){
    this.initLoginForm();
      this.auth = getAuth(firebase.firebaseApp);
  }
  ngOnInit(){

    this.addSongService.hideBottomIcon.next(false);
    
  this.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'normal',
    'callback': () => {
  
      this.flag=true;
    }
  }, this.auth);
  this.recaptchaVerifier.render()

}
  initLoginForm(){                      // form structure is defined
    this.LoginForm=this.fb.group({
      phoneNo:['',[Validators.required,Validators.pattern(REGEX.PHONE_NUMBER)]]
    })
  }
  login(){                  // post request is called to authenticate the phone no and storing the 
        if(this.LoginForm.valid){ // user credentials in the local Storage
          if(this.flag!==true){
            this.alert=true
          }
          this.LoginForm.value.phoneNo='+91'+this.LoginForm?.value?.phoneNo
   
      signInWithPhoneNumber(this.auth, this.LoginForm?.value?.phoneNo, this.recaptchaVerifier).then((result:any)=>{
      

        localStorage.setItem(STORAGE_KEYS.VERIFICATION_ID,JSON.stringify(result.verificationId))
        this.router.navigate([PATHS.AUTH.GET_OTP])
      }).catch(()=>{
      
        setTimeout(()=>{
          window.location.reload();
        },5000)
      }
      )

    }
    else {
      this.Toast.fire({
        icon: 'error',
        title: 'Enter All Fields'
      })
    }
  }
  get controls(){
    return this.LoginForm.controls;
  }
  ngOnDestroy(): void {
    this.addSongService.hideBottomIcon.next(true)
  }

}
