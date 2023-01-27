import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService:AuthService,
    private route :Router
  ) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.authService.loginWithRedirect();
  }

  closeSession(){
    this.authService.logout();
  }

  navigateToProfile(){
    this.route.navigateByUrl("/perfil");
  }
}
