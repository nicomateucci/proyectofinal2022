import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { IUser } from 'src/app/Models/iuser';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  //EXISTE UN PROXY CONFIGURADO PARA EVITAR PONER LA URL ENTERA
  // private urlBackend='http://localhost:3000/users/'
  private currentUser! : IUser | null;
  
  constructor(
    private http: HttpClient,
    //private router: Router
  ){}

  //SE RETORNA UN OBSERVABLE, DEPENDIENDO DEL MISMO SI SE MATCHEA CON UN USUARIO O NO
  login(loginForm: FormGroup): Observable<IUser|boolean> {
    let userName = String(loginForm.value.id);
    let password = String(loginForm.value.password);
    //this.http.get('/api/users/',loginForm)
    return this.http.get<IUser>('/api/users/'+userName)
      .pipe(
        tap( (userData:any) =>{
          //ACA EL ENDPOINT DEBERIA DEVOLVER EL TOKEN CON LA INFORMACION DEL USUARIO ENCRIPTADA
          //JWT O CUALQUIER OTRO GENERADOR PUEDE USARSE
          //WINDOWS.BTOA LO SIMULA CON LOS DATOS DEL USUARIO DEVUELTO DEL FAKE-BACKEND
          this.currentUser = <IUser>userData;
          const token = window.btoa((JSON.stringify(this.currentUser)))
          localStorage.setItem('userToken', token);
        })
      )
      .pipe(catchError(err =>{
        return of(false);
      }))
  }

  logout(){
    localStorage.clear();
    this.currentUser = null;
    location.reload()
  }

  registerUser(valueForm: FormGroup) {
    // ESTE METODO IRIA AL ENDPOINT PERO COMO TRABAJO CON UN FAKE TENGO QUE ADECUAR METODOS
    //DE IGUAL MANERA SE TENDRIA QUE CAMBIAR SOLAMENTE LA RUTA A LA CUAL SE HACE EL PEDIDO
    let options = { 
      headers : new HttpHeaders (
        {'Content-Type' : 'application/json'}
      )
    };
    return this.http.post('/api/users/', valueForm, options);
  }

  checkAunthentication(): boolean{
    //ACA LO UNICO QUE TENEMOS FORMA ES DE VERIFICACAR QUE EXISTA EL TOKEN DEL USER
    //PERO ESTO DEBERIA IR AL ENDPOINTY VERIFICAR QUE EL USUARIO ESTE ACTUALMENTE LOGEADO O VER COMO SE HARIA PARA TENER
    //UN USUARIO EN LA SESION
    if (!localStorage.getItem('userToken')){
      return false
    }
    const userToken = String(localStorage.getItem('userToken'));
    this.currentUser = this.decodeToken(userToken);
    return true;
  }

  private decodeToken(userToken: string): IUser {
    const userInfo = JSON.parse(window.atob(userToken)) as IUser;
    // return { ...userInfo, token: userToken };
    return { ...userInfo };
  }

  getCurrentUser(): Observable< IUser | null >{
    return of(this.currentUser);    
  }

  getUser(){
    return this.currentUser
  }

}
