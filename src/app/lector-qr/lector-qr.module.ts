import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectorQrPageRoutingModule } from './lector-qr-routing.module';

import { LectorQrPage } from './lector-qr.page';
import { Device } from '@ionic-native/device/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LectorQrPageRoutingModule
  ],
  providers: [
    Device,
    BarcodeScanner,
  ],
  declarations: [LectorQrPage]
})
export class LectorQrPageModule {}
