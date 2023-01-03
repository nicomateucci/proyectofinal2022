import { Injectable } from '@angular/core';
import jsonData from '../../../dataLiveCoin.json';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {


  constructor() { 
  }

  //ACA HABRIA QUE HACER LA LLAMADA A LA API PARA OBTENER LOS DATOS
  getData(){
    return jsonData;
  }
}
