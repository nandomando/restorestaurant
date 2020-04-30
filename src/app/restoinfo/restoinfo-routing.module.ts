import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestoinfoPage } from './restoinfo.page';

const routes: Routes = [
  {
    path: '',
    component: RestoinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestoinfoPageRoutingModule {}
