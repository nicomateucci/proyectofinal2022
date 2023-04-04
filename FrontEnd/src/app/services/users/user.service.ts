import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  urlBackend: string = "http://localhost:3000/users/";

  constructor(private http: HttpClient
  ) { }

  getUser(userName: string) {
    return this.http.get(this.urlBackend + userName)
  }

  RegisterUser(valueForm: any) {
    return this.http.post(this.urlBackend, valueForm)
  }
}
