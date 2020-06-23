import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LoadingService } from '../services/loading.service';
import { RuatService } from '../services/ruat.service';
import { BeanRequest } from '../model/beanRequest';
import { DeviceDataService } from '../services/device-data.service';
import { BeanResponse } from '../model/beanResponse';
import { DataService } from '../services/data.service';
import { AlertService } from '../services/alert.service';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { StorageRuatService } from '../services/storage-ruat.service';
import { environment } from '../../environments/environment';
import { Device } from '@ionic-native/device/ngx';
import { EsInicialService } from '../services/es-inicial.service';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQrPage implements OnInit {
  private request:BeanRequest = <BeanRequest>{};
  private response: BeanResponse = <BeanResponse>{};
  constructor(
    private barcodeScanner: BarcodeScanner,
    private loadingService: LoadingService,
    private ruatService: RuatService,
    private deviceService: DeviceDataService,
    private dataService: DataService,
    private alertController: AlertController,
    private navController: NavController,
    private storageService: StorageRuatService,
    private platform: Platform,
    private device: Device,
    private esInicial: EsInicialService
    ) {
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.request = {
        manufacturer: this.device.manufacturer,
        codigo: '',
        model: this.device.model,
        platform: this.device.platform,
        uuid: this.device.uuid,
        version: this.device.version
      }
      if(this.deviceService.get()) {
        this.request = this.deviceService.get();
      }
      this.validarYaRegistrado();
    });
    
  }
  async validarYaRegistrado() {
    this.storageService.getItems().then(async data => {
      if(data) {
        if(data.length > 0) {
          if(this.esInicial.get()){
            await this.storageService.deleteItems();
            this.escanearCodigo();
          }else {
            this.dataService.set(data[0]);
            //this.navController.navigateRoot('/home');
            this.escanearCodigo();
          }
        }else {
          await this.storageService.deleteItems();
          this.escanearCodigo();
        }
      }else {
        await this.storageService.deleteItems();
        this.escanearCodigo();
      }
    });
  }
  escanearCodigo() {
    this.barcodeScanner.scan({
      prompt: 'Porfavor enfoque el codigo QR.'
    }).then(barcodeData => {
      let codigo: string = barcodeData.text;
      this.loadingService.present();
      this.request.codigo = codigo;
      if(environment.production){
        this.ruatService.postGlobal<BeanResponse>('/rest/auth/valida_usuario', this.request)
        .subscribe(data => {
          this.response = data;
          if(this.response.estado) {
            if(!this.response.beanAutentificado.estado) {
              this.presentAlertConfirm('Alerta', this.response.beanAutentificado.mensaje);
            }
            this.dataService.set(this.response);
            this.storageService.addItem(this.response)
            .then( data => {

              this.loadingService.dismiss();
              this.navController.navigateRoot('/home');
            }).catch(err => {

              this.loadingService.dismiss();
              this.presentAlertConfirm('Error', 'Error al registrar los datos del usuario.');
            });
          }else{
            this.loadingService.dismiss();
            this.presentAlertConfirm('Error', this.response.mensaje);
          }
        }, err => {
          this.loadingService.dismiss();
          this.presentAlertConfirm('Error', "Hubo un error al autenticar los datos con el sistema, vuelva a intentar.");
        });
      } else {
        let response: BeanResponse = {
          beanAutentificado: {
            estado: true,
            mensaje: 'Error al registrar el dispositivo, ya se registro el dispositivo anteriormente.'
          },
          beanUsuario: {
            id: 1,
            login: 'acarrillo',
            nombre: 'Alexeis Vladimir Carrillo Pinaya',
          },
          estado: true,
          mensaje: 'El dispositivo ya fue registrado en otra cuenta.'
        };
        this.response = response;
        if(this.response.estado) {
          if(!this.response.beanAutentificado.estado) {
            this.presentAlertConfirm('Alerta', this.response.beanAutentificado.mensaje);
          }
          this.dataService.set(this.response);
          this.storageService.addItem(this.response)
          .then( data => {
            this.loadingService.dismiss();
            this.navController.navigateRoot('/home');
          }).catch(err => {
            this.loadingService.dismiss();
            this.presentAlertConfirm('Error', 'Error al registrar los datos del usuario.');
          });
        }else{
          this.loadingService.dismiss();
          this.presentAlertConfirm('Error', this.response.mensaje);
        }
      }
    }).catch(err => {
         this.presentAlertConfirm('Error', err.mensaje);
     });
  }
  recargarApp() {
      window.location.reload();
  }

  async presentAlertConfirm(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.recargarApp();
          }
        }
      ]
    });

    await alert.present();
  }
}
