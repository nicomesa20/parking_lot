import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

import { MenuController, NavController } from '@ionic/angular';

import { observeAuthService } from '../utils/services/observeAuth.service';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    number_plate: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.required)
  })
  confirmPassowrd: string

  constructor(
    private userService: UserService,
    private observeAuth: observeAuthService,
    private menu: MenuController,
    private router: NavController,
    private authService: AuthService
  ) {
    this.menu.enable(false);
  }


  ngOnInit() {
  }

  onRegister() {
    this.userService.add(this.registerForm.value).subscribe((data: User) => {
      let body: any = {
        user_name: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value
      }
      this.authService.add(body).subscribe(user => {
        this.observeAuth.setItem('user', user)
        this.router.navigateForward('/home')
      })
    })
  }

}
