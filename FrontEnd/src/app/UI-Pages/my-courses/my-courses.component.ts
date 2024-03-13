import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/Models/icourse';
import { CourseService } from 'src/app/Services/courses/course.service';
import { UserService } from 'src/app/Services/users/user.service';
import { UiComponentsModule } from 'src/app/UI-Componets/ui-components.module';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [
    UiComponentsModule
  ],
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
    const courses: ICourse[] = [];   
   
    for (var val of this.userService.getUser()?.courses!) {
      this.coursesService.getCoursesFromUser(val).subscribe(
        (data : any) =>{
          courses.push(data[0]); 
        }
      )
    }
    this.TempListCourses = courses;

  }
  
}
