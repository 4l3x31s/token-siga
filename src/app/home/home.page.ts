import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { StorageRuatService } from '../services/storage-ruat.service';
import { EsInicialService } from '../services/es-inicial.service';
import { LoadingService } from '../services/loading.service';
import { BeanResponse } from '../model/beanResponse';
import * as moment from 'moment';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public response: BeanResponse = <BeanResponse>{};
  public datoRecibido: boolean = false;
  constructor(
    private navController: NavController,
    private dataService: DataService,
    private storageService: StorageRuatService,
    private esInicial: EsInicialService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {
    

  }
  ngOnInit(): void {
    
    
    if(environment.production){
      if (this.dataService.get()) {
        this.response = this.dataService.get();
        this.datoRecibido = true;
      } else {
        this.datoRecibido = false;
        this.esInicial.set(false);
        this.alertService.present('Error', 'Error al obtener los datos.');
        this.navController.navigateRoot('/lector-qr')
      }
    }else {
      this.datoRecibido = true;
      this.response = {
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
    }
  }
  irQR() {
    this.esInicial.set(true);
    this.navController.navigateRoot('/lector-qr');
  }
}
