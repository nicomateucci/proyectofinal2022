import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICourse } from 'src/app/Models/icourse';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(
    private http: HttpClient,
    private userService : UserService
  ) {}
  
  /**
   * Devuelve todos los cursos disponibles, dependiendo del usuario y su subscripcion
   * @returns Observable<ICourse[ ]>
  */
  getCourses(): Observable<ICourse[]> {
    if (this.userService.getSubscription()){
      //ESTO DEBERIA SER CHEQUEADO CON EL USUARIO ACTUAL EN EL BACKEND Y DEVOLVER LOS CURSOS SEGUN SEAN FREE O GOLD
      return this.http.get<ICourse[]>('/api/courses');
    }
    return this.http.get<ICourse[]>(`/api/courses/?subscription=${"free"}`);
  }

  getCourse(nameCourse: string) {
    return this.http.get<ICourse>(`/api/courses?name=${nameCourse}`);
  }

  getCourseByID(IDCourse: number) {
    return this.http.get<ICourse>(`/api/courses?id=${IDCourse}`);
  }

  //LA IDEA DE STO ES QUE POR TIPO SE ALMACENE
  getCoursesByType(typeCourse : string) : Observable<ICourse[]> {
    // if (this.userService.getSubscription()){
    //   //ESTO DEBERIA SER CHEQUEADO CON EL USUARIO ACTUAL EN EL BACKEND Y DEVOLVER LOS CURSOS
    //   return this.http.get<ICourse[]>(`/api/courses?level=${typeCourse}&subscription=${"gold"}`);
    // }
    return this.http.get<ICourse[]>(`/api/courses?level=${typeCourse}&subscription=${"free"}`);
  }

}
