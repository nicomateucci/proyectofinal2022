import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { IUser, IUserWithToken } from 'src/app/models/iuser';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private currentUser! : IUser | IUserWithToken | null;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  //SE RETORNA UN OBSERVABLE, DEPENDIENDO DEL MISMO SI SE MATCHEA CON UN USUARIO O NO
  login(loginForm: any): Observable<IUser|boolean> {
    let userName = String(loginForm.value.id);
    let password = String(loginForm.value.password);
    //this.http.get('/api/users/',loginForm)
    return this.http.get('/api/users/'+userName)
      .pipe(
        tap( (userData:any) =>{
          this.currentUser = <IUserWithToken>userData;
          //ACA EL ENDPOINT DEBERIA DEVOLVER EL TOKEN CON LA INFORMACION DEL USUARIO ENCRIPTADA
          //JWT O CUALQUIER OTRO GENERADOR PUEDE USARSE
          //WINDOWS.BTOA LO SIMULA
          const userToken = window.btoa((JSON.stringify(this.currentUser)))
          this.saveTokenToLocalStore(userToken);
        })
      )
      .pipe(catchError(err =>{
        return of(false);
      }))
  }

  logout(){
    this.removeUserFromLocalStorage();
    this.currentUser = null;
  }

  registerUser(valueForm: any) {
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
    if(localStorage.getItem('userToken')){
      return true;
    }
    return false;
  }

  saveTokenToLocalStore(token:string){
    localStorage.setItem('userToken', token);
    //console.log(window.atob(String(localStorage.getItem("token"))))
  }

  private decodeToken(userToken: string): IUserWithToken {
    const userInfo = JSON.parse(window.atob(userToken)) as IUser;
    return { ...userInfo, token: userToken };
  }

  removeUserFromLocalStorage(){
    localStorage.clear();
  }

}
