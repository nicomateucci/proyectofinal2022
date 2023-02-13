import { Component,OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/courses/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  
  course: any

  constructor(
    private courseService: CourseService,
    private route : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(
      data => {
        this.course = this.courseService.getCourse(data['id']);
      });
    } 

}
