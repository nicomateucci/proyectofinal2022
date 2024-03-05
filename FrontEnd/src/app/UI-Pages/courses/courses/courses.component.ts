import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/Services/courses/course.service';
import { UserService } from 'src/app/Services/users/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  courses : any;
  level! : string;
  panelOpenState = true;

  constructor(
    private coursesService: CourseService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.level = <string>this.route.snapshot.paramMap.get('level')
    // console.log(this.route.snapshot.paramMap.get('level'))
    this.coursesService.getCourses().subscribe(
      (data : any) =>{
        this.courses = data;
        console.log(this.courses)
      }
    )
  }

  showMessage() {
    alert('Curso Agregado!')
  }

}
