import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReserveFormComponent } from './reserve-form/reserve-form.component';
import { ReserveDetailComponent } from './reserve-detail/reserve-detail.component';
import { QRCodeModule } from 'angularx-qrcode'


@NgModule({
  declarations: [
    ReserveFormComponent,
    ReserveDetailComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    QRCodeModule
  ]
})
export class ComponentsModule { }
