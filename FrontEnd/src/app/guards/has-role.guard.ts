import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/users/user.service';
import { inject } from '@angular/core';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  //VERIFICAR LOS ROLES DEL USUARIO ACTIVO PARA RENDERIZAR LOS ROLES
  return inject(UserService).checkRoles() || inject(Router).navigateByUrl('home');

};
