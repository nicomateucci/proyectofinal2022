import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesComponent } from './courses/courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { isLoggedGuard } from 'src/app/Guards/is-logged.guard';

const routes: Routes = [
  { 
    path: 'courses',
    component: CoursesComponent
  },
  { 
    path: 'courses/:name',
    component: CourseItemComponent,
    // canMatch :[isLoggedGuard]
  },
  // { 
  //   path: 'courses/:id',
  //   component: CourseItemComponent
  // },
  { 
    path: 'myCourses',
    component: MyCoursesComponent,
    canMatch :[isLoggedGuard]
  },
  { 
    path: 'myCourses/:name',
    component: CourseItemComponent,
    // canMatch :[isLoggedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
