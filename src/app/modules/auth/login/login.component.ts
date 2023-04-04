import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PATHS, REGEX } from 'src/app/common/constants';
import { getAuth,RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import "firebase/firestore"
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Firebase } from 'src/app/core/services/firebase.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  auth:any

  recaptchaVerifier:any
  LoginForm!: FormGroup
  constructor(private fb:FormBuilder,private router :Router,private firebase:Firebase){
    this.initLoginForm();
      this.auth = getAuth(firebase.app);
  }
  ngOnInit(){
  this.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'normal',
    'callback': (response:any) => {
      console.log(response)
    }
  }, this.auth);
  this.recaptchaVerifier.render()

}
  initLoginForm(){
    this.LoginForm=this.fb.group({
      phoneNo:['',[Validators.required,Validators.pattern(REGEX.PHONE_NUMBER)]]
    })
  }
  login(){
        this.LoginForm.value.phoneNo = '+91'+this.LoginForm.value.phoneNo

      console.log(this.LoginForm.value);
      signInWithPhoneNumber(this.auth, this.LoginForm.value.phoneNo, this.recaptchaVerifier).then((result:any)=>{
          console.log(result,result.verificationId)
        localStorage.setItem('VerificationCode',JSON.stringify(result.verificationId))
        this.router.navigate([PATHS.AUTH.GET_OTP])
      }).catch((err)=>{
        console.log(err);
        setTimeout(()=>{
          window.location.reload();
        },5000)
      }
      )
  }
  get controls(){
    return this.LoginForm.controls;
  }

}
