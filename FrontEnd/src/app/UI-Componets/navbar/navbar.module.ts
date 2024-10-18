import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MenuBurgerComponent } from './menu-burger/menu-burger.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

const utilities = [
  NavbarComponent,
  MenuBurgerComponent
]

@NgModule({
  declarations: [
    ...utilities
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  exports :[
    ...utilities
  ]
})
export class NavbarModule { }
