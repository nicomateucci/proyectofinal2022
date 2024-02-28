import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, of, tap } from 'rxjs';
import { IUser } from 'src/app/Models/iuser';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  //EXISTE UN PROXY CONFIGURADO PARA EVITAR PONER LA URL ENTERA
  // private urlBackend='http://localhost:3000/users/'
  private currentUser: IUser | null = null;

  constructor(
    private http: HttpClient
  ) {
  }

  //SE RETORNA UN OBSERVABLE, DEPENDIENDO DEL MISMO SI SE MATCHEA CON UN USUARIO O NO
  login(loginForm: FormGroup): Observable<IUser | boolean> {
    let userName = String(loginForm.value.id);
    let password = String(loginForm.value.password);
    //this.http.get('/api/users/',loginForm)
    return this.http.get<IUser>('/api/users/' + userName)
      .pipe(
        tap((userData: any) => {
          //ACA EL ENDPOINT DEBERIA DEVOLVER EL TOKEN CON LA INFORMACION DEL USUARIO ENCRIPTADA
          //JWT O CUALQUIER OTRO GENERADOR PUEDE USARSE
          //WINDOWS.BTOA LO SIMULA CON LOS DATOS DEL USUARIO DEVUELTO DEL FAKE-BACKEND
          this.currentUser = <IUser>userData;
          this.createToken();
        })
      )
      .pipe(catchError(err => {
        console.log(err);
        return of(false);
      }))
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    location.reload();
  }

  registerUser(valueForm: FormGroup) {
    // ESTE METODO IRIA AL ENDPOINT PERO COMO TRABAJO CON UN FAKE TENGO QUE ADECUAR METODOS
    //DE IGUAL MANERA SE TENDRIA QUE CAMBIAR SOLAMENTE LA RUTA A LA CUAL SE HACE EL PEDIDO
    let options = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    };
    return this.http.post('/api/users/', valueForm, options);
  }

  /**
   * Retorna el usuario actual, si es que este existe en forma de observable.
  */
  getCurrentUser(): Observable<IUser | null> {
    return this.http.get<IUser>('/api/users/' + this.currentUser?.id);
  }

  /**
   * Retorna el usuario actual, si es que este existe.
  */
  getUser() {
    return this.currentUser
  }

  /**
   * Retorna un booleano dependiendo de si el usuario es del tipo gold o no.
  */
  getSubscription(): boolean {
    return this.currentUser?.subscription === 'gold';
  }

  udpdateUser(){
    let options = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    };
    this.http.patch('api/users/' + this.currentUser?.id, { ...this.currentUser }, options).subscribe(
      dataUser => {
        this.currentUser = <IUser>dataUser
        this.createToken();
      }
    );
  }  
   
  /**
   * Recibe el ID del curso seleccionado, si no esta iniciado se agregara a los cursos comenzados
   * @param courseID 
   */
  addCourse(courseID: string) {
  //HABRIA QUE VER SI HAY UNA MEJOR FORMA DE VERIFICAR ESTOS DATOS, DE ESTA FORMA "FUNCIONA PERO TENGO MIS DUDAS"
    if (!this.checkCourse(courseID)) {
      localStorage.clear();
      this.currentUser?.courses.push(courseID);
      this.udpdateUser()
    }
  }
  
  deleteCourse(courseID: string){
    const index = <number>this.currentUser?.courses.indexOf(courseID, 0);
    if (index > -1) {
      this.currentUser?.courses.splice(index, 1);
    }
    this.udpdateUser();
  }

  /**
   * Se chequea que el curso no este iniciado por parte del usuario
   */
  checkCourse(courseID: string): boolean {
    return <boolean>this.currentUser?.courses.includes(courseID);
  }

  //----------------------------------BACKEND VALIDACIONES----------------------------------//

  /**
   * Retorna un booleano si es que existe almacenado un token
   * @returns Boolean - true si existe un token, falso en caso contrario
   */
  checkAunthentication(): boolean {
    //ACA LO UNICO QUE TENEMOS FORMA ES DE VERIFICACAR QUE EXISTA EL TOKEN DEL USER
    //PERO ESTO DEBERIA IR AL ENDPOINTY VERIFICAR QUE EL USUARIO ESTE ACTUALMENTE LOGEADO O VER COMO SE HARIA PARA TENER
    //UN USUARIO EN LA SESION
    if (!localStorage.getItem('Token')) {
      return false
    }
    this.currentUser = this.decodeToken();
    return true;
  }

  checkRoles(): boolean {
    if (this.checkAunthentication()) {
      //VALIDACION PRECARIA PERO PERMITE SABER EN MEDIDA SI EL USUARIO TIENE ESTE ROL
      return <boolean>this.currentUser?.scopes.includes('admin')
    }
    return false
  }

  public createToken(): string {
    const token = window.btoa((JSON.stringify(this.currentUser)))
    localStorage.setItem('Token', token);
    return token;
  }

  /**
   * Devuelve la infomacion del usuario, decoficando el token almacenado en la sesion.
   * @returns  ...userInfo 
   */

  private decodeToken(): IUser {
    const userToken = String(localStorage.getItem('Token'));
    const userInfo = JSON.parse(window.atob(userToken)) as IUser;
    // return { ...userInfo, token: userToken };
    return { ...userInfo };
  }

  //----------------------------------BACKEND VALIDACIONES----------------------------------//

}
