import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AssetService {

  // urlApi = "https://api.livecoinwatch.com/coins/list"
  urlBackend: string = "http://localhost:3000/coins/";

  constructor(
    private http: HttpClient,
  ) { }

  getDataAllCoins() {
    return this.http.get('/api/coins/');
  }

  getDataCoin(nameCoin:string) {
    return this.http.get('/api/coins?name='+nameCoin);
  }

  // getDataFromApi() {
  //   let payload = {
  //     "currency": "USD",
  //     "sort": "rank",
  //     "order": "ascending",
  //     "offset": 0,
  //     "limit": 100,
  //     "meta": true
  //   }
  //   let headers = {
  //     'content-type': 'application/json',
  //     'x-api-key': 'c6cd5096-b115-4ce0-b4be-5e447cf0b74b'
  //   }
  //   return this.http.post(this.urlApi, payload, { headers })
  // }
}

