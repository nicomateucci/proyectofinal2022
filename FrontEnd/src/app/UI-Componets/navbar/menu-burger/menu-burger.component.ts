import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/users/user.service';
import { LoginComponent } from 'src/app/UI-Pages/login/login.component';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-menu-burger',
  templateUrl: './menu-burger.component.html',
  styleUrl: './menu-burger.component.css'
})
export class MenuBurgerComponent extends NavbarComponent implements OnInit  {

  isMenuOpen = false;
  
  constructor(
    protected override  userService: UserService,
    protected override  dialog: MatDialog
  ) { 
    super(userService,dialog);
  }

  toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: MouseEvent) {
      const target = event.target as HTMLElement;

      // Verifica si el clic fue fuera del nav-list
      if (this.isMenuOpen && !target.closest('.nav-list') && !target.closest('.menu-toggle')) {
          this.isMenuOpen = false;
      }
  }

  closeMenuClick(event: MouseEvent) {
    this.isMenuOpen = false;
  }


}
