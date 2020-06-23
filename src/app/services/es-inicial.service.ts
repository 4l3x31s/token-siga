import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EsInicialService {
  private inicial: boolean;
  constructor() { }
  get() {
    return this.inicial;
  }
  set(inicial: boolean) {
    this.inicial = inicial;
  }
}
