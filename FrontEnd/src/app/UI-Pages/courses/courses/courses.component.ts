import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  courses : any;
  coursePrinc!:any;
  courseInter!:any;
  courseAvanz!:any;
  panelOpenState = true;

  constructor(
  ) { }

  ngOnInit(): void {
    
  }
}
