import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthReq } from '../model/auth-req';
import { User } from '../model/user';
import { API } from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends API<AuthReq> {

  constructor(http: HttpClient) {
    super(http);
  }

  protected URL = `${this.URL_API}auth`;
}

