import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestoinfoPageRoutingModule } from './restoinfo-routing.module';

import { RestoinfoPage } from './restoinfo.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RestoinfoPageRoutingModule
  ],
  declarations: [RestoinfoPage]
})
export class RestoinfoPageModule {}
