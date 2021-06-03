import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class ReserveService extends API<any> {

  constructor(http: HttpClient) {
    super(http);
  }

  protected URL = `${this.URL_API}reservation`;
}
