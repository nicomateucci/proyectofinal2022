import { Component,OnInit } from '@angular/core';
import { CourseService } from 'src/app/Services/courses/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  
  courses : any;
  panelOpenState = false;

  constructor(
    private coursesService : CourseService
  ){}

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(
      (data: any) => {
        this.courses = data;
      }
    )
  }

  showMessage(){
    alert('Messi')
  }

}
