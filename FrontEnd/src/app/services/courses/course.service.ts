import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ICourse } from 'src/app/Models/icourse';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(
    private http: HttpClient) {
  }

  getCourses() {
    return this.http.get<ICourse[]>('/api/courses');
  }

  getCourse(nameCourse: string) {
    return this.http.get<ICourse>('/api/courses?name='+ nameCourse);
  }

}
