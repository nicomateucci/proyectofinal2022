import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/Services/courses/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  course: any;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      this.course = data.id;
    })
    this.courseService.getCourse(this.course).subscribe((data: any) => {
      this.course = data[0];
    })
  }

}
