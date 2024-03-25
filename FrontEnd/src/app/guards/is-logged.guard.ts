import { CanMatchFn, Router } from '@angular/router';
import { UserService } from '../Services/users/user.service';
import { inject } from '@angular/core';

export const isLoggedGuard: CanMatchFn = (route, state) => {
  //Esto deberia chequear que el usuario este logea y tenga permisos para poder ver el curso en cuestion
  return inject(UserService).checkAunthentication() || inject(Router).navigateByUrl('home');
};
