import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from 'src/app/UI-Pages/login/login.component';

@Component({
  selector: 'app-layout-login',
  standalone:true,
  imports: [    
    LoginComponent
  ],
  templateUrl: './layout-login.component.html',
  styleUrl: './layout-login.component.css'
})
export class LayoutLoginComponent {

}
