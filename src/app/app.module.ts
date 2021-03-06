import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode'
import { AuthInterceptor } from './utils/interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    QRCodeModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    NativeStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
