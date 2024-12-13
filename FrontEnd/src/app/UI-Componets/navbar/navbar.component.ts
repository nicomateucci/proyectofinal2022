import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { AuthService } from '@auth0/auth0-angular';
import { IUser } from 'src/app/models/iuser';
import { UserService } from 'src/app/services/users/user.service';
import { LoginComponent } from 'src/app/UI-Pages/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isFixed = false;

  constructor(
    protected userService: UserService,
    protected dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.checkCurrentUser()
  }

  checkCurrentUser() {
    return this.userService.checkAunthentication();
  }

  //0AUTH METODOS
  // loginUser(){
  //   this.authService.loginWithRedirect();
  // }

  // closeSession(){
  //   this.authService.logout();
  // }

  login() {
    // const dialogRef = this.dialog.open(LoginComponent);
    this.dialog.open(LoginComponent);
  }

  logout() {
    this.userService.logout();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isFixed = window.scrollY > 50; // Cambia este valor según sea necesario
  }


}
