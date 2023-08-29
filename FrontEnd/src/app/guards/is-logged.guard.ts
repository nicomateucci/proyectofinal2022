import { CanMatchFn } from '@angular/router';
import { UserService } from '../services/users/user.service';
import { inject } from '@angular/core';


export const isLoggedGuard: CanMatchFn = (route, state) => {
  return inject(UserService).checkAunthentication();
};
