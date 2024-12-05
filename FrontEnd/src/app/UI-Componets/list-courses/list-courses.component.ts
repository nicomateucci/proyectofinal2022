import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CourseService } from 'src/app/Services/courses/course.service';
import { UserService } from 'src/app/Services/users/user.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.css'
})
export class ListCoursesComponent {

  @Input() level !: string;
  cursos !:any;
  TempListCourses !: [] | null;
  panelOpenState = false;

  filterCourses !: string;
  filterCategory !: string ;

  constructor(
    private coursesService: CourseService,
    public userService: UserService,
    private cdr : ChangeDetectorRef,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      if ( params['CoursesType'] || params['CoursesByCategory']){
        this.filterCourses = params['CoursesType']; 
        this.filterCategory = params['CoursesByCategory']; 
        this.getCoursesByLevel();
      } else{
        this.getAllCourses();
      }
    });
  }

  getAllCourses(){
    //se deberia chequear el usuario si esta logeado o no, para devolver todos los cursos segun sea la vista de cursos o mis cursos
    this.coursesService.getAllCourses().subscribe(
      (data : any) =>{
        this.cursos = data ;
        this.TempListCourses = data.slice(0,6);
      });
      this.cdr.detectChanges();
  }

  getCoursesByLevel(){
    this.coursesService.getCourses(this.filterCourses).subscribe(
      (data: any) => {
        this.cursos = data;
        this.TempListCourses = this.cursos.slice(0, 6);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al obtener cursos:', error);
      }
    );
  }

  showMessage() {
    alert('Curso Agregado!')
  }

  //Esto deberia hacerse en el Backend paginando por tamaño de ventana
  handlePageEvent(e: PageEvent) {
    this.TempListCourses = this.cursos.slice(e.pageIndex * e.pageSize, (e.pageIndex + 1) * e.pageSize);
    //window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getNumbersOfCourses(){
    if(this.cursos != undefined){
      return this.cursos.length
    }
  }

}
