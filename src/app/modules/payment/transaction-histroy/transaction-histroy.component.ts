import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { UserDetailsService } from 'src/app/core/services/user-details.service';
@Component({
  selector: 'app-transaction-histroy',
  templateUrl: './transaction-histroy.component.html',
  styleUrls: ['./transaction-histroy.component.scss']
})
export class TransactionHistroyComponent implements OnInit{

  purchasedSongList:any=[];

  constructor(private userService:UserDetailsService,private spinner:NgxSpinnerService,private transactionService:TransactionService,private router:Router){}

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

  ngOnInit(): void {
    this.spinner?.show()
    this.transactionService?.getPurchasedSong()?.subscribe((res)=>{
      if(res){
      this.purchasedSongList=Object.values(res)
      }
    this.spinner?.hide()

  
    },()=> {
      this.Toast.fire({
        icon:'error',
        title:'Session Expired, Please Login Again'
      })
      localStorage.clear();
      this.userService.isLoggedIn$.next(false);
      this.router.navigate([PATHS.MAIN.DASHBOARD])  
    }
    

    )
  }

}
