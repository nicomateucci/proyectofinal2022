import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CourseService } from 'src/app/services/courses/course.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent implements OnInit{

  @Input()
  level !: string;
  cursos !:any;
  TempListCourses !: any;
  panelOpenState = false;

  constructor(
    private coursesService: CourseService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(){
    this.coursesService.getAllCourses().subscribe(
      (data : any) =>{
        this.cursos = data ;
      });
  }

  getCoursesByLevel(){
    this.coursesService.getCourses(this.level).subscribe(
      (data : any) =>{
        this.cursos = data ;
      })
  }

  showMessage() {
    alert('Curso Agregado!')
  }

  handlePageEvent(e: PageEvent) {
    this.TempListCourses = this.cursos.slice(e.pageIndex * e.pageSize, (e.pageIndex + 1) * e.pageSize);
  }

  getNumbersOfCourses(){
    if(this.cursos != undefined){
      return this.cursos.length
    }
  }

  abrirVentana(){
    this.TempListCourses = this.cursos.slice(0,6)
  }

}
