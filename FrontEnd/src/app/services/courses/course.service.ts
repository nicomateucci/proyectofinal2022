import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  urlBackend: string = "http://localhost:3000/courses";

  constructor(
    private http: HttpClient) {
  }

  getCourses() {
    //return arrCourses;
    return this.http.get(this.urlBackend);
  }

  getCourse(nameCourse: string) {
    return this.http.get(this.urlBackend + "?name=" + nameCourse);
  }

}
