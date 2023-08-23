import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { IUser } from 'src/app/models/iuser';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public currentUser! : IUser | null;
  
  constructor(
    private http: HttpClient
  ){}

    //SE RETORNA UN OBSERVABLE, DEPENDIENDO DEL MISMO SI SE MATCHEA CON UN USUARIO O NO
   loginUser(loginForm: any): Observable<IUser|boolean> {
    let userName = String(loginForm.value.id);
    let password = String(loginForm.value.password);
    //this.http.get('/api/users/',loginForm)
    return this.http.get('/api/users/'+userName)
      .pipe(
        tap( (data:any) =>{
          this.currentUser = <IUser>data;
          //Esto simula almacenar el token de usuario dentro del localstorage
          localStorage.setItem('currentUser', window.btoa((JSON.stringify(this.currentUser))));
          //console.log(window.atob(String(localStorage.getItem("tokenUser"))))
      }))
      .pipe(catchError(err =>{
        return of(false);
      }))
    }

  registerUser(valueForm: any) {
    // ESTE METODO IRIA AL ENDPOINT PERO COMO TRABAJO CON UN FAKE TENGO QUE ADECUAR METODOS
    //DE IGUAL MANERA SE TENDRIA QUE CAMBIAR SOLAMENTE LA RUTA A LA CUAL SE HACE EL PEDIDO
    let options = { 
      headers : new HttpHeaders ({'Content-Type' : 'application/json'})
    };
    return this.http.post('/api/users/', valueForm, options);
  }

  checkAunthentication(){
    //RUTA DEL ENDPOINT QUE VALIDA LA AUTENTIFICACION DEL USUARIO
    // this.http.get('/api/users/authentication')
    //   .pipe(
    //     tap( (data:any) => {
    //       if (data instanceof Object){
    //         this.currentUser = <IUser>data;
    //       }
    //     })
    //   )
    //   .subscribe()

    //ACA LO UNICO QUE TENEMOS FORMA ES DE VERIFICACAR QUE EXISTA EL TOKEN DEL USER
     if (localStorage.getItem("currentUser")){
      return true;
     }
    return false;
  }

  logout(){
    this.currentUser = null;
    localStorage.clear();
  }

}
