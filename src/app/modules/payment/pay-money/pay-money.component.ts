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
  stripeCard:any
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
    if (!this.stripeScriptTag.StripeInstance) {               // Checking if Stripe token is present or not
      this.stripeScriptTag.setPublishableKey(STRIPE_KEYS.PUBLIC_KEY);
    }
    this.initTransactionForm();
  }

  initTransactionForm(){                    // this function defines the form structure
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

  OnBuying(){                                       // this function will store the user details when the 
    if(this.transactionForm.valid){                 // user buys the song
      this.transactionForm.value.songId=this.songId;
      this.transactionForm.value.transcationDate= new Date()
      this.transactionForm.value.tokenId=this.transactionResult?.id
      this.transactionForm.value.last4Digit = this.transactionResult?.card?.last4
      this.transactionForm.value.cardId=this.transactionResult?.card?.id
      this.transactionForm.value.cardBrand=this.transactionResult?.card?.brand
      this.transactionForm.value.songName=this.buySong?.songName
    
      this.transactionService?.postPurchasedSong(this.transactionForm?.value)?.subscribe()
    }
    this.route.navigate([PATHS.MAIN.DASHBOARD])
  }


  cardCaptureReady = false

  ngOnInit(): void {
    this.spinner.show();
     this.amount= this.transactionService?.amount
     this.songId=this.transactionService?.songId
      this.songService?.getAllSongs()?.subscribe((res:any)=>{   // getting all songs details to get 
          this.songsArray= Object.values(res);            //  songId which we are purchasing 
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



  onStripeInvalid( error: any ){          // If the card No. is invalid the this function will invoke
    console.log(error)
    this.Toast.fire({
      icon: 'error',
      title: 'Invalid card'
    })
  }

  onStripeError( error: any ){                // If your card is expired or any service provider error 
    // console.log('Stripe error', error)      // will show case in this function
    this.Toast.fire({
      icon: 'error',
      title: error.message
    })
    
  }


  setStripeToken( token: stripe.Token ){      // this method will generate the unique token_id from which the
                                              // person buys the song
    this.transactionResult=token;
    this.Toast.fire({
        icon:'success',
        title:'Amount paid Successfully'
    })
    console.log(this.transactionResult)
    this.OnBuying();

  }
  setPaymentMethod( token: stripe.paymentMethod.PaymentMethod ){  // misslanious method
    console.log('Stripe Payment Method', token)
  }

  setStripeSource( source: stripe.Source ){                     // misslanious method
    console.log('Stripe Source', source)
  }

  
}
