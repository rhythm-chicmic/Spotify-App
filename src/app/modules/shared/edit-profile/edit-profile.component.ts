import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import {  REGEX } from 'src/app/common/constants';
import { Router } from '@angular/router';
import { UserDetailsService } from 'src/app/core/services/user-details.service';
import Swal from 'sweetalert2'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { UserProfileComponent } from '../../dashboard/user-profile/user-profile.component';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  submitted = false;
  myProfile:any
  documentId!:string
  percentageVal!: Observable<number |null|undefined>;
  selectedFile:any
  storagePath!:string
  imagePath!:string
  addProfileForm!:FormGroup
  @ViewChild(FormGroupDirective)
  formDirective!:FormGroupDirective;
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
  constructor(private dialogRef:MatDialogRef<UserProfileComponent>,private storage:AngularFireStorage,private service:UserDetailsService, @Optional() @Inject(MAT_DIALOG_DATA) public data:any,  private fb: FormBuilder, public dialog: MatDialog,private router:Router ) { 
      this.myProfile = Object.values(data)[0]
      this.documentId=data?.docId
    
    this.initaddProfileFormForm();
  }

  initaddProfileFormForm(){
    this.addProfileForm=this.fb.group({
      firstName:[this.myProfile[0]?.firstName,[Validators.required,Validators.pattern(REGEX.NAME)]],
      lastName:[this.myProfile[0]?.lastName,[Validators.required,Validators.pattern(REGEX.NAME)]],
      image:[this.myProfile[0]?.imageUrl,[Validators.pattern(REGEX.IMAGE)]],
      uId:[this.myProfile[0]?.uId]
    })
}
get controls(){
  return this.addProfileForm?.controls;
}
addProfile(){
  if((this.addProfileForm as FormGroup).valid){
 
      this.addProfileForm.value.image=this.imagePath
        this.service.putUserDetails(this.addProfileForm?.value,this.documentId).subscribe(()=>{
          this.dialogRef.close()
        })
     
    this.formDirective.resetForm();
    this.Toast.fire({
      icon: 'success',
      title: 'Updated successfully'
    })

    }
    else{
      this.submitted =false;
      
    }
}

selectFile(event:any,path:string){
  this.selectedFile=event.target?.files[0]
    this.storagePath=path
  this.upload();
}

upload(){
  const filePath = `${this.storagePath}/${this.selectedFile.name}`;
  const storageRef= this.storage?.ref(filePath);
  const uploadTask = this.storage?.upload(filePath,this.selectedFile);
  this.percentageVal = uploadTask?.percentageChanges();
  uploadTask.snapshotChanges().pipe(
    finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadURL => {
          this.imagePath=downloadURL
          
      });
    })
  ).subscribe();


 }


}
