import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { BeanResponse } from '../model/beanResponse';

@Injectable({
  providedIn: 'root'
})
export class StorageRuatService {

  constructor(private storage: Storage) { }

  addItem(item: BeanResponse): Promise<any> {
    return this.storage.get(environment.itemKey).then((items:BeanResponse[]) => {
      if (items) {
        if (items.length ===  0) {
          return this.storage.set(environment.itemKey, [item]);
        }
      }else {
        return this.storage.set(environment.itemKey, [item]);
      }
    });
  }
  getItems(): Promise<BeanResponse[]> {
    return this.storage.get(environment.itemKey);
  }
  updateItem(item: BeanResponse): Promise<any> {
    return this.storage.get(environment.itemKey).then((items:BeanResponse[]) => {
      if (!items || items.length ===  0) {
          return null;
      }
      let newItems: BeanResponse[] = [];
      for (let i of items) {
        if (i.beanUsuario.id === item.beanUsuario.id){
          newItems.push(item);
        }else {
          newItems.push(i);
        }
      }
      return this.storage.set(environment.itemKey, newItems);
    });
  }
  deleteItems() {
    return this.storage.get(environment.itemKey).then((items:BeanResponse[]) => {
      if (!items || items.length ===  0) {
          return null;
      }
      let toKeep: BeanResponse[] = [];
      return this.storage.set(environment.itemKey, toKeep);
    });
  }

}
