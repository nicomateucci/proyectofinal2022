import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-courses',
  templateUrl: './card-courses.component.html',
  styleUrl: './card-courses.component.css'
})
export class CardCoursesComponent {
  
  @Input() course!:any

}
