import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { 
    path: 'courses',
    component: CoursesComponent
  },
  { 
    path: 'courses/:id',
    component: CourseItemComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
