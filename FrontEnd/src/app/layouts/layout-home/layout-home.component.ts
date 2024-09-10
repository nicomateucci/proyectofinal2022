import { Component } from '@angular/core';
import { HomeComponent } from 'src/app/UI-Pages/home/home.component';

@Component({
  selector: 'app-layout-home',
  standalone: true,
  imports:[ 
    HomeComponent
  ],
  templateUrl: './layout-home.component.html',
  styleUrl: './layout-home.component.css'
})
export class LayoutHomeComponent {

}
