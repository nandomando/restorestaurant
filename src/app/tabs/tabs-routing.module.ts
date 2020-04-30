import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tab',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/tab/home',
        pathMatch: 'full'
      },
      { path: 'home',
      loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)},
      {
        path: 'scan',
        loadChildren: () => import('../scan/scan.module').then( m => m.ScanPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('../editusercard/editusercard.module').then( m => m.EditusercardPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
