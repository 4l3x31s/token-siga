import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { DecriptService } from './decript.service';

@Injectable({
  providedIn: 'root'
})
export class RuatService {

  headers: HttpHeaders;
  url: string;
  valor: string;
  jsonNew: string;
  constructor(public http: HttpClient,
              public decriptService: DecriptService) {
      this.url = this.decriptService.enviarvalor();
      
  }
    getGlobal<Object>(url: string) {
        return this.http.get<Object>(this.url + url);
    }
    postGlobal<Object>(url: string, objeto: any) {
        return this.http.post<Object>(this.url + url, objeto, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
            ,
        });
    }
    deleteGlobal<Object>(url: string, codigo: string) {
        return this.http.delete<Object>(this.url + url + codigo, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        });
    }

    putGlobal<Object>(url: string, id: string, objeto: any) {
        return this.http.put<Object>(this.url + url + id, objeto, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        });
    }
}
