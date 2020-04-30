import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditusercardPage } from './editusercard.page';

const routes: Routes = [
  {
    path: '',
    component: EditusercardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditusercardPageRoutingModule {}
