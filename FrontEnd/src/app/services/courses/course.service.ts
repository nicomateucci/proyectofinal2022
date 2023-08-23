import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(
    private http: HttpClient) {
  }

  getCourses() {
    return this.http.get('/api/courses');
  }

  getCourse(nameCourse: string) {
    return this.http.get('/api/courses?name='+ nameCourse);
  }

}
