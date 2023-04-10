import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PATHS } from 'src/app/common/constants';
import { AddSongsComponent } from './add-songs/add-songs.component';
import { IsAdminGuard } from 'src/app/core/guards/is-admin.guard';



const routes: Routes = [
    {path:PATHS.ADMIN.ADD_SONGS,canActivate:[IsAdminGuard],component:AddSongsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
