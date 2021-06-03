import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

import { MenuController, NavController } from '@ionic/angular';

import { observeAuthService } from '../utils/services/observeAuth.service';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/model/user';
import { RegisterReq } from '../model/register-req';
import { AuthReq } from '../model/auth-req';
import { CustomValidators } from '../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],
    birthdate: ['', Validators.required],
    cellphone: ['', Validators.required],
    number_plate: ['', Validators.required],
    document: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  }, {
    validators: CustomValidators.matchPassword
  })

  constructor(
    private userService: UserService,
    private observeAuth: observeAuthService,
    private menu: MenuController,
    private router: NavController,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.menu.enable(false);
  }


  ngOnInit() {
  }

  onRegister(value: RegisterReq) {
    delete value['confirm_password']
    value.birthdate = value.birthdate.slice(0, value.birthdate.indexOf('T'))
    this.userService.add(this.registerForm.value).subscribe((data: User) => {
      let body: AuthReq = {
        user: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        type: 'user',
        keep_logged_in: true
      }
      this.authService.add(body).subscribe(user => {
        this.observeAuth.setItem('user', user)
        this.router.navigateForward('/home')
      })
    })
  }

}
