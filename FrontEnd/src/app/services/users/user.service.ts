import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  urlLocal="http://localhost:3000/";

  constructor(private http: HttpClient
    ){ }
  
  getUser(userName:string,userPassword:string){
    return this.http.get(this.urlLocal+"users/"+userName)
  }

  RegisterUser(valueForm:any){
    return new Observable<any>;
  }
}
