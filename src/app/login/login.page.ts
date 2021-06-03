import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/model//user'
import { observeAuthService } from '../utils/services/observeAuth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet, MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthReq } from '../model/auth-req';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  constructor(
    private authService: AuthService,
    private observeAuth: observeAuthService,
    private router: NavController,
    private menu: MenuController,
    private fb: FormBuilder
  ) {
    this.menu.enable(false);
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  onLogin(value) {
    let body: AuthReq = {
      ...value,
      keep_logged_in: true,
      type: 'user'
    }
    this.authService.add(body).subscribe(data => {
      this.observeAuth.setItem('user', data)
      this.router.navigateForward('/home')
    })
  }

}
