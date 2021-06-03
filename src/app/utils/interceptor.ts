import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from './services/alert.service';
import { observeAuthService } from './services/observeAuth.service';
import { RefreshTokenService } from '../services/refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private alertService: AlertService,
    private observeAuth: observeAuthService,
    private refreshService: RefreshTokenService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = JSON.parse(localStorage.getItem('user')).token
    let authReq = req
    if (authToken) {
      authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) });
    }
    return next.handle(authReq).pipe(catchError(err => {
      switch (err.status) {
        case 400: {
          this.alertService.message('Error', 'danger', 'Error en parametros')
          break
        }
        case 401: {
          const refresh = JSON.parse(localStorage.getItem('refresh'))
          if (refresh) {
            this.refreshService.update(localStorage.getItem('refreshToken'), {}).subscribe(data => {
              this.observeAuth.setItem('accessToken', data['token'])
              localStorage.setItem('refreshToken', data['refresh'])
              localStorage.setItem('user', JSON.stringify(data))
            }, error => {
              this.observeAuth.clear()
              this.alertService.message('Error', 'danger', 'Sesión expirada')
            })
          } else {
            this.observeAuth.clear()
            if (err.error?.detailed) this.alertService.message('Error', 'danger', err.error.detailed)
          }
          break
        }
        case 500: {
          console.log('Error', 'danger', 'Error de servidor');
          break
        }
        default: {
          this.alertService.message('Error', 'danger', err.error?.detailed)
          break
        }
      }
      return throwError(err);
    }));
  }
}
