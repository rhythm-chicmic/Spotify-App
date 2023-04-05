import { Component, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS, REGEX, STORAGE_KEYS } from 'src/app/common/constants';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { userData } from 'src/app/common/constants';
import swal from 'sweetalert2'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDetailsService } from 'src/app/core/services/user-details.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  hide = true;
  startDate = new Date(1990, 0, 1);
  submitted = false;
  RegisterForm!:FormGroup
  userData:any
  @ViewChild(FormGroupDirective)
  formDirective!:FormGroupDirective;
  Toast =swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', swal.stopTimer)
      toast.addEventListener('mouseleave', swal.resumeTimer)
    }
  })
  constructor(private fb:FormBuilder,private router:Router,private service:UserDetailsService,private fireService:AngularFirestore){
    this.initRegisterForm();
   
  }
  initRegisterForm(){
    this.RegisterForm=this.fb.group({
      firstName:['',[Validators.required,Validators.pattern(REGEX.NAME)]],
      lastName:['',[Validators.required,Validators.pattern(REGEX.NAME)]],
      email:['',[Validators.required,Validators.email,Validators.pattern(REGEX.EMAIL)]],
      password:['',[Validators.required,Validators.minLength(6),Validators.pattern(REGEX.PASSWORD)]],
      phoneNo:['',[Validators.required,Validators.pattern(REGEX.PHONE_NUMBER)]],
      uId:['']
    })
}
get controls(){
  return this.RegisterForm.controls;
}
Register(){
  if((this.RegisterForm as FormGroup).valid){
    this.RegisterForm.value.uId=userData?.user?.uid
      console.log(this.RegisterForm.value);
        this.service.postUserDetails(this.RegisterForm?.value).subscribe((res)=>{
          console.log(res)
        })
       
    // this.formDirective.resetForm();
    this.Toast.fire({
      icon: 'success',
      title: 'Account created successfully'
    })
 
    // this.router.navigate([PATHS.MAIN.DASHBOARD]);
    }
    else{
      this.submitted =false;
    }
}

}
