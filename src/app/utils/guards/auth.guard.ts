import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { observeAuthService } from '../services/observeAuth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public user = JSON.parse(localStorage.getItem('user'))
  constructor(
    private router: NavController,
    private observeAuth: observeAuthService
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.observeAuth.watchStorage().subscribe(() => {
      this.user = JSON.parse(localStorage.getItem('user'))
      if (this.user) {
        return true
      } else {
        this.router.navigateRoot('/')
        return false
      }
    })
    if (this.user) {
      return true
    } else {
      this.router.navigateRoot('/')
      return false
    }
  }

}
