import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICourse } from 'src/app/Models/icourse';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private url : string = '/api/courses';

  constructor(
    private http: HttpClient,
    private userService : UserService
  ) {}
  
  /**Retorna el numero de curso segun el tipo especificado */
  //ESTO PODRIA VERIFICARSE EN EL TOKEN DEL BACKEND, SEGUN EL ENCABEZADO
  //COMO TRABAJO CON UN FAKE BACKEND,ES LO UNICO QUE PUEDO HACER
  getCourses(typeCourse:string) {
    if (this.userService.getSubscription()) {
      return this.http.get<ICourse>(`${this.url}?level=${typeCourse}`);
    }
    return this.http.get<ICourse>(`${this.url}?level=${typeCourse}&subscription=${"free"}`);

  }

  /**Retorna el curso segun el nombre especificado */
  getCourse(nameCourse: string) {
    return this.http.get<ICourse>(`${this.url}?name=${nameCourse}`);
  }

  /**Retorna el curso segun el ID especificado 
   * @param IDCourse
  */
  getCourseByID(IDCourse: number) {
    return this.http.get<ICourse>(`${this.url}?id=${IDCourse}`);
  }

  /**Retorna los cursos segun el tipo y la paginacion especificada 
     * @param typeCourse - Tipo de curso
     * @param pageNro - Numero de pagina
     * @param pageSize - Tamaño de pagina (Opcional)
  */
  getCoursesPaginated(typeCourse : string, pageNro : number, pageSize ?:number){
      //ESTO TOMA POR PAGINA EL LIMIETE
      if (this.userService.getSubscription()){
        return this.http.get<ICourse[]>(`${this.url}?level=${typeCourse}&_page=${pageNro}&_limit=${pageSize}`);
      }
      return this.http.get<ICourse[]>(`${this.url}?level=${typeCourse}&subscription=${"free"}&_page=${pageNro}&_limit=${pageSize}`);
  }


  // getCoursesByType(typeCourse : string) : Observable<ICourse[]> {
  //   if (this.userService.getSubscription()){
  //     return this.http.get<ICourse[]>(`/api/courses?level=${typeCourse}`);
  //   }
  //   return this.http.get<ICourse[]>(`/api/courses?level=${typeCourse}&subscription=${"free"}`);
  // }


  /**Retorna el numero de curso segun el tipo especificado */
  //ESTO PODRIA VERIFICARSE EN EL TOKEN DEL BACKEND, SEGUN EL ENCABEZADO
  //COMO TRABAJO CON UN FAKE BACKEND,ES LO UNICO QUE PUEDO HACER
  getCoursesFromUser(typeCourse: number) {
    if (this.userService.getSubscription()) {
      return this.http.get<ICourse>(`${this.url}?id=${typeCourse}`);
    }
    return this.http.get<ICourse>(`${this.url}?id=${typeCourse}&subscription=${"free"}`);

  }

}
