import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/Services/users/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileJSON :any;

  constructor(
    // private userService : UserService,
    public authService : AuthService
  ){}

  ngOnInit(): void {
    // this.userService.getCurrentUser().subscribe(
    //   (dataUser:any) =>{
    //     this.profileJSON = JSON.stringify(dataUser,null, 2);
    //   }
    // )
  }

}
