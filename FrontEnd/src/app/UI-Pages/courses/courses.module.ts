import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { UiComponentsModule } from 'src/app/UI-Componets/ui-components.module';
import { CourseItemComponent } from './course-item/course-item.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseItemComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    UiComponentsModule, 
    YouTubePlayerModule
  ]
})
export class CoursesModule { }
