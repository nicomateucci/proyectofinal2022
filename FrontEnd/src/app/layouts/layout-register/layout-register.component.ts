import { Component } from '@angular/core';
import { RegisterComponent } from 'src/app/UI-Pages/register/register.component';

@Component({
  selector: 'app-layout-register',
  standalone:true,
  imports: [    
    RegisterComponent
  ],
  templateUrl: './layout-register.component.html',
  styleUrl: './layout-register.component.css'
})
export class LayoutRegisterComponent {

}
