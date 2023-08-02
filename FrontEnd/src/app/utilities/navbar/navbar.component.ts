import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService:AuthService,
    public dialog : MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  //0AUTH METODOS
  // loginUser(){
  //   this.authService.loginWithRedirect();
  // }

  // closeSession(){
  //   this.authService.logout();
  // }

  login(){
    const dialogRef = this.dialog.open(LoginComponent);
  }

}
