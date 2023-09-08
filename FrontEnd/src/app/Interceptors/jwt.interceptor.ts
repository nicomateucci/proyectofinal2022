import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../Services/users/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService
  ) { }

  intercept(
    request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Si existe un token, significa que hay un usuario vinculado todavia
    const user = this.userService.getUser();
    if (!user) {
      return next.handle(request);
    } else {
      const token = this.userService.createToken()
      const headers = request.headers.append(
        'Authorization',
        `Bearer ${token}`
      )
      return next.handle(request.clone({ headers }));
    }
  }
}

export const authTokeninterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true,
};

