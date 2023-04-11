import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PayMoneyComponent } from './pay-money/pay-money.component';
import { TransactionHistroyComponent } from './transaction-histroy/transaction-histroy.component';


const routes: Routes = [
  {path:PATHS.PAYMENT.PAY_MONEY,canActivate:[AuthGuard],component:PayMoneyComponent},
  {path:PATHS.PAYMENT.TRANSACTION_HISTORY,canActivate:[AuthGuard],component:TransactionHistroyComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
