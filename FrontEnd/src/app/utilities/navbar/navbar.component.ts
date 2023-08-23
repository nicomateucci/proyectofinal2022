import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { LoginComponent } from 'src/app/login/login.component';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(
    private userService:UserService,
    public dialog : MatDialog,
  ) { }

  ngOnInit(): void {
    this.checkCurrentUser()
  }

  checkCurrentUser(){
   return this.userService.checkAunthentication();
  }

  //0AUTH METODOS
  // loginUser(){
  //   this.authService.loginWithRedirect();
  // }

  // closeSession(){
  //   this.authService.logout();
  // }

  login(){
    // const dialogRef = this.dialog.open(LoginComponent);
    this.dialog.open(LoginComponent);
  }

  logout(){
    this.userService.logout();
  }

}
