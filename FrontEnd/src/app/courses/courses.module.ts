import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { CourseItemComponent } from './course-item/course-item.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseItemComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    UtilitiesModule,
    AngularMaterialModule,
  ]
})
export class CoursesModule { }
