import { Component, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS, REGEX, STORAGE_KEYS } from 'src/app/common/constants';
import { IMAGES } from 'src/app/common/constants';
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
  imageUrl=IMAGES.ADD_PROFILE_IMAGE
  startDate = new Date(1990, 0, 1);
  submitted = false;
  addProfileForm!:FormGroup
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
    this.initaddProfileFormForm();
   
  }
  initaddProfileFormForm(){
    this.addProfileForm=this.fb.group({
      firstName:['',[Validators.required,Validators.pattern(REGEX.NAME)]],
      lastName:['',[Validators.required,Validators.pattern(REGEX.NAME)]],
      email:['',[Validators.required,Validators.email,Validators.pattern(REGEX.EMAIL)]],
      image:['',[Validators.required,Validators.pattern(REGEX.IMAGE)]],
      uId:['']
    })
}
get controls(){
  return this.addProfileForm.controls;
}
addProfile(){
  if((this.addProfileForm as FormGroup).valid){
    this.addProfileForm.value.uId=userData?.user?.uid
      console.log(this.addProfileForm.value);
        this.service.postUserDetails(this.addProfileForm?.value).subscribe((res)=>{
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
