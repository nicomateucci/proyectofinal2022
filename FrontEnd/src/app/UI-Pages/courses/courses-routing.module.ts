import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesComponent } from './courses/courses.component';
import { isLoggedGuard } from 'src/app/Guards/is-logged.guard';

const routes: Routes = [
  { 
    path: 'Cursos',
    component: CoursesComponent
  },
  { 
    path: 'Cursos/:name',
    component: CourseItemComponent,
    // canMatch :[isLoggedGuard]
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
