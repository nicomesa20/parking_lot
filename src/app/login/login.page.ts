import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/model//user'
import { observeAuthService } from '../utils/services/observeAuth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet, MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = new FormGroup({
    user_name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthService,
    private observeAuth: observeAuthService,
    private router: NavController,
    private menu: MenuController
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.router.navigateForward('')
  }

  onLogin() {
    this.authService.add(this.loginForm.value).subscribe(data => {
      this.observeAuth.setItem('user', data)
      this.router.navigateForward('/home')
    })
  }

}
