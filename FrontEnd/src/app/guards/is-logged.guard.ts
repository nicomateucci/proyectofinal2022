import { CanMatchFn, Router } from '@angular/router';
import { UserService } from '../Services/users/user.service';
import { inject } from '@angular/core';

export const isLoggedGuard: CanMatchFn = (route, state) => {
  return inject(UserService).checkAunthentication() || inject(Router).navigateByUrl('home');
};
