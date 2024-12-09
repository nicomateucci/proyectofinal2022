import { Component, HostListener, Input } from '@angular/core';
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
  pageSize!: number;
  pageSizeOptions!: number[];

  constructor(
    private coursesService: CourseService,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(){
    this.updatePageSize();
    //se deberia chequear el usuario si esta logeado o no, para devolver todos los cursos segun sea la vista de cursos o mis cursos
    this.coursesService.getAllCourses().subscribe(
      (data : any) =>{
        this.cursos = data ;
        this.TempListCourses = data.slice(0,this.pageSize);
    });
  }

  getCoursesByLevel(){
    this.updatePageSize();
    this.coursesService.getCourses(this.level).subscribe(
      (data : any) =>{
        this.cursos = data ;
      })
      this.TempListCourses = this.cursos.slice(0,this.pageSize);
  }

  showMessage() {
    alert('Curso Agregado!')
  }

  handlePageEvent(event: PageEvent) {
    this.updateDisplayedCourses(event.pageIndex,event.pageSize)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getNumbersOfCourses(){
    if(this.cursos != undefined){
      return this.cursos.length
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updatePageSize(); 
  }

  updatePageSize(): void {
    switch (true) { 
      case (window.innerWidth <= 600):
        this.pageSize = 6;
        this.pageSizeOptions = [6];
        break;
      case (window.innerWidth > 600 && window.innerWidth <= 1024):
        this.pageSize = 4;
        this.pageSizeOptions = [4,8,12];
        break;
      default:
        this.pageSize = 8;
        this.pageSizeOptions = [8,12,16];
        break;
    }
    if (this.cursos) {
      this.updateDisplayedCourses(0,this.pageSize)
    }
  }

  updateDisplayedCourses(pageIndex: number, pageSize:number): void {
    this.TempListCourses = this.cursos.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }

}
