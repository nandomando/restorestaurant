import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditusercardPageRoutingModule } from './editusercard-routing.module';

import { EditusercardPage } from './editusercard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditusercardPageRoutingModule
  ],
  declarations: [EditusercardPage]
})
export class EditusercardPageModule {}
