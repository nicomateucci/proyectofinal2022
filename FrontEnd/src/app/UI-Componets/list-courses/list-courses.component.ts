import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  TempListCourses !: any;
  panelOpenState = false;

  constructor(
    private coursesService: CourseService,
    public userService: UserService,
    private cdr : ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
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
    this.coursesService.getCourses(this.level).subscribe(
      (data : any) =>{
        this.cursos = data ;
      })
      //Para paginar lso primeros 6 cursos
      this.TempListCourses = this.cursos.slice(0,6);
      this.cdr.detectChanges();
  }

  showMessage() {
    alert('Curso Agregado!')
  }

  handlePageEvent(e: PageEvent) {
    this.TempListCourses = this.cursos.slice(e.pageIndex * e.pageSize, (e.pageIndex + 1) * e.pageSize);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getNumbersOfCourses(){
    if(this.cursos != undefined){
      return this.cursos.length
    }
  }

}
