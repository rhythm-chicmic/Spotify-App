import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayMoneyComponent } from './pay-money/pay-money.component';
import { PaymentRoutingModule } from './payment-routing.module';


@NgModule({
  declarations: [
    PayMoneyComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
