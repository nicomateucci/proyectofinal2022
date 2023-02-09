import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  declarations: [
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    UtilitiesModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
