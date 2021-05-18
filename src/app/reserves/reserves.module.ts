import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservesPageRoutingModule } from './reserves-routing.module';
import { ReservesPage } from './reserves.page';

import { QRCodeModule } from 'angularx-qrcode'
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservesPageRoutingModule,
    QRCodeModule,
    ComponentsModule
  ],
  declarations: [ReservesPage]
})
export class ReservesPageModule { }
