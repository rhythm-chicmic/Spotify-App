import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS, STRIPE_KEYS } from 'src/app/common/constants';
import { AddSongsService } from 'src/app/core/services/add-songs.service';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { StripeScriptTag } from "stripe-angular"
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-pay-money',
  templateUrl: './pay-money.component.html',
  styleUrls: ['./pay-money.component.scss']
})
export class PayMoneyComponent implements OnInit{
  invalidError:any
  cardDetailsFilledOut:any
  songsArray:Array<any>=[]
  buySong:any;
  transactionResult:any;
  songId!:string
  amount!:string
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


  transactionForm!:FormGroup

  constructor(private spinner :NgxSpinnerService,private fb:FormBuilder,private songService:AddSongsService,private route:Router,private stripeScriptTag: StripeScriptTag,private transactionService:TransactionService) {
    if (!this.stripeScriptTag.StripeInstance) {
      this.stripeScriptTag.setPublishableKey(STRIPE_KEYS.PUBLIC_KEY);
    }
    this.initTransactionForm();
  }

  initTransactionForm(){
    this.transactionForm= this.fb.group({
        name:['',Validators.required],
        songId:[this.songId],
        transcationDate:[''],
        cardBrand:[''],
        last4Digit:[''],
         cardId:[''],
         tokenId:[''],
         songName:['']
         
    })
  }

  OnBuying(){
    if(this.transactionForm.valid){
      this.transactionForm.value.songId=this.songId;
      this.transactionForm.value.transcationDate= new Date()
      this.transactionForm.value.tokenId=this.transactionResult?.id
      this.transactionForm.value.last4Digit = this.transactionResult?.card?.last4
      this.transactionForm.value.cardId=this.transactionResult?.card?.id
      this.transactionForm.value.cardBrand=this.transactionResult?.card?.brand
      this.transactionForm.value.songName=this.buySong.songName
    
      this.transactionService?.postPurchasedSong(this.transactionForm?.value)?.subscribe()
    }
    this.route.navigate([PATHS.MAIN.DASHBOARD])
  }


  cardCaptureReady = false

  ngOnInit(): void {
    this.spinner.show();
     this.amount= this.transactionService?.amount
     this.songId=this.transactionService?.songId
      this.songService?.getAllSongs()?.subscribe((res:any)=>{
          this.songsArray= Object.values(res);
          this.spinner.hide();
          this.songsArray.find((res:any)=>{
            if(res.id===this.songId){
              this.buySong=res;
           
            } 
          })
      })

     if(!this.amount || !this.songId){
      Swal.fire({
        icon:'error',
        title:' Song Not Selected'  
      }).then(()=>{
        this.route.navigate([PATHS.MAIN.DASHBOARD])
      })
     }
  }



  onStripeInvalid( error: Error ){
   
    this.Toast.fire({
      icon: 'error',
      title: 'Invalid Number'
    })
  }

  onStripeError( error: Error ){
    console.error('Stripe error', error)
    this.Toast.fire({
      icon: 'error',
      title: 'Transaction Failed'
    })
    
  }



  setStripeToken( token: stripe.Token ){
    
    this.transactionResult=token;
    this.Toast.fire({
        icon:'success',
        title:'Amount paid Successfully'
    })
    this.OnBuying();

  }

  setStripeSource( source: stripe.Source ){
    console.log('Stripe Source', source)
  }
}
