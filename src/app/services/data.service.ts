import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any;
  constructor() { }
  get(): any {
    return this.data;
  }
  set(data: any) {
    this.data = data;
  }
}
