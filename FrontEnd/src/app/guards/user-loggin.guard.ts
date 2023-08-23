import { CanMatchFn } from '@angular/router';
import { UserService } from '../services/users/user.service';

//ACA FALTA LA VALIDACION CON LA API SI EL USUARIO ESTA LOGEADO, HABRIA QUE TENER ALGUN TOKEN O JWT PARA HACERLO

export const userLogginGuard: CanMatchFn = (route, segments) => {
  //ACA SE IRIA AL SERVICIO PARA VER SI EL MISMO USUARIO ESTA CARGADO Y CON PERMISOS


  //return userService.checkAunthentication();
  return true;
};
