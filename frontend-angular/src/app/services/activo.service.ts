import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import jsonData from '../../../dataLiveCoin.json';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {


  constructor(
    private http: HttpClient,
  ) {
  }

  //ACA HABRIA QUE HACER LA LLAMADA A LA API PARA OBTENER LOS DATOS
  getData() {
    return jsonData;
  }

  getDataFromApi() {
    let url = "https://api.livecoinwatch.com/coins/list"
    let payload = {
      "currency": "USD",
      "sort": "rank",
      "order": "ascending",
      "offset": 0,
      "limit": 100,
      "meta": true
    }
    let headers = {
      'content-type': 'application/json',
      'x-api-key': 'c6cd5096-b115-4ce0-b4be-5e447cf0b74b'
    }
    return this.http.post(url,payload,{headers})
  }
}
