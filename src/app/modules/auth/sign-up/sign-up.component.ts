import { Component, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS, REGEX, STORAGE_KEYS } from 'src/app/common/constants';
import { IMAGES } from 'src/app/common/constants';
import { userData } from 'src/app/common/constants';
import swal from 'sweetalert2'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDetailsService } from 'src/app/core/services/user-details.service';
import { Observable, finalize } from 'rxjs';

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
  selectedFile:any
  percentageVal!: Observable<number |null|undefined>;
  storagePath!:string
  imagePath!:string
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
  constructor(private fb:FormBuilder,private storage:AngularFireStorage,private router:Router,private service:UserDetailsService,private fireService:AngularFirestore){
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
      this.addProfileForm.value.image=this.imagePath
        this.service.postUserDetails(this.addProfileForm?.value).subscribe((res)=>{
          console.log(res)
        })
      console.log(this.addProfileForm.value);
       
    this.formDirective.resetForm();
    this.Toast.fire({
      icon: 'success',
      title: 'Account created successfully'
    })
 
    this.router.navigate([PATHS.MAIN.DASHBOARD]);
    }
    else{
      this.submitted =false;
      console.log("HII")
    }
}
selectFile(event:any,path:string){
  this.selectedFile=event.target?.files[0]
    this.storagePath=path
  this.upload();
}
upload(){
  const filePath = `${this.storagePath}/${this.selectedFile.name}`;
  const storageRef= this.storage.ref(filePath);
  const uploadTask = this.storage.upload(filePath,this.selectedFile);
  this.percentageVal = uploadTask.percentageChanges();
  uploadTask.snapshotChanges().pipe(
    finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadURL => {
          this.imagePath=downloadURL
          console.log(this.imagePath,1)
      });
    })
  ).subscribe(()=>{

  });


 }


}
