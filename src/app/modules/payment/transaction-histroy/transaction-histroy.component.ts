import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-transaction-histroy',
  templateUrl: './transaction-histroy.component.html',
  styleUrls: ['./transaction-histroy.component.scss']
})
export class TransactionHistroyComponent implements OnInit{

  purchasedSongList:any=[];

  constructor(private spinner:NgxSpinnerService,private transactionService:TransactionService){}

  ngOnInit(): void {
    this.spinner.show()
    this.transactionService.getPurchasedSong().subscribe((res)=>{
      this.purchasedSongList=Object.values(res)
    this.spinner.hide()

  
    })
  }

}
