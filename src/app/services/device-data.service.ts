import { Injectable } from '@angular/core';
import { BeanRequest } from '../model/beanRequest';

@Injectable({
  providedIn: 'root'
})
export class DeviceDataService {
  private request: BeanRequest;
  constructor() { }
  get(): BeanRequest{
    return this.request;
  }
  set(request: BeanRequest) {
    this.request = request;
  }
}
