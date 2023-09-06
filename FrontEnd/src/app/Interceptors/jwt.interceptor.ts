import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      //Si existe un token, significa que hay un usuario vinculado todavia
      const token = localStorage.getItem('Token')
      if (token) {
        const headers = request.headers.append(
          'Authorization',
          `Bearer ${token}`
        )
        return next.handle(request.clone({ headers }));
      }
      //Caso contrario, hara las peticiones siempre y cuando no sean necesarios las autorizaciones
      return next.handle(request);
    }
}

export const authTokeninterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true,
};

