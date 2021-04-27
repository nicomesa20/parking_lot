import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { API } from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends API<User> {

  constructor(http: HttpClient) {
    super(http);
  }

  protected URL = `${this.URL_API}auth`;
}

