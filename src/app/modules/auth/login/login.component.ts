import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX } from 'src/app/common/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  LoginForm!: FormGroup
  constructor(private fb:FormBuilder){
    this.initLoginForm();
  }
  initLoginForm(){
    this.LoginForm=this.fb.group({
      phoneNo:['',[Validators.required,Validators.pattern(REGEX.PHONE_NUMBER)]]
    })
  }
  login(){
    if(this.LoginForm.valid){
      console.log(this.LoginForm.value);
    }
  }
  get controls(){
    return this.LoginForm.controls;
  }

}
