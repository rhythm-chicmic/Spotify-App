import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PARENT_PATHS } from './common/constants';
import { AdminModule } from './modules/admin/admin.module';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';
const routes: Routes = [
  {path:PARENT_PATHS.DEFAULT,loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
  {path:PARENT_PATHS.AUTH, loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
  {path:PARENT_PATHS.MAIN,loadChildren:()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:PARENT_PATHS.ADMIN,loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),AuthRoutingModule,DashboardRoutingModule,AdminModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
