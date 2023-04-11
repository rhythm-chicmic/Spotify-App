import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayMoneyComponent } from './pay-money/pay-money.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { StripeModule } from "stripe-angular"
import { STRIPE_KEYS } from 'src/app/common/constants';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PayMoneyComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    StripeModule.forRoot(STRIPE_KEYS.PUBLIC_KEY),
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
