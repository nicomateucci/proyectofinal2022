import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/models/icourse';
import { CourseService } from 'src/app/services/courses/course.service';
import { UserService } from 'src/app/services/users/user.service';


@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit{

  constructor(
    private userService : UserService,
    private coursesService : CourseService
  ){}

  TempListCourses !: any;

  ngOnInit(): void {
    for (var val of this.userService.getUser()?.courses!) {
      this.coursesService.getCoursesFromUser(val).subscribe(
        (data : any) =>{
          this.TempListCourses = data
        }
      )
    }
    // this.TempListCourses = courses;

  }

  getCourses(){
    console.log(this.TempListCourses);
  }
  
}
