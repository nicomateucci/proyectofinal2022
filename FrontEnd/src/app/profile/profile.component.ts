import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileJSON :any;

  constructor(
    public authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.user$.subscribe((dataUser:any) =>{
      this.profileJSON = JSON.stringify(dataUser,null, 2);
    })
  }

}
