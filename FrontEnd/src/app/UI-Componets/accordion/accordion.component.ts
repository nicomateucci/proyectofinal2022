import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CourseService } from 'src/app/Services/courses/course.service';
import { UserService } from 'src/app/Services/users/user.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent implements OnInit{

  @Input()
  level !: string;
  courses !: any;
  panelOpenState = true;

  constructor(
    private coursesService: CourseService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.getCourses(0);
  }

  getCourses(pageNro:number,pageSize?:number){
    this.coursesService.getCoursesPaginated(this.level,pageNro,pageSize).subscribe(
      (data : any) =>{
        this.courses = data;
        //console.log(this.courses)
      })
  }

  showMessage() {
    alert('Curso Agregado!')
  }

  pageIndex = 0;
  pageSize = 6;
  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.getCourses(this.pageIndex,this.pageSize);
    //console.log(this.courses)
  }

  getAllCourses(){
    return 100
  }

}
