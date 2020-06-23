import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-ts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DecriptService {

  constructor() { }

  enviarvalor(): string {
    const desencriptado = AES.decrypt(environment.url, environment.llave);
    return desencriptado.toString(enc.Utf8);
  }
}
