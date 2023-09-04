import { CanActivateFn } from '@angular/router';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  //VERIFICAR LOS ROLES DEL USUARIO ACTIVO PARA RENDERIZAR LOS ROLES
  return true;
};
