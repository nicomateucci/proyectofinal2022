import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  url = "https://api.livecoinwatch.com/coins/list"
  urlLocal="http://localhost:3000"

  constructor(
    private http: HttpClient,
  ) {
  }

  //ACA HABRIA QUE HACER LA LLAMADA A LA API PARA OBTENER LOS DATOS
  getData() {
    return this.http.get(this.urlLocal+"/coins");
  }

  getDataFromApi() {
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
    return this.http.post(this.url , payload, {headers} )
  }
}

