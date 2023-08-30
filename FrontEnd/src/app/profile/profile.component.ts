import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { IUser, IUserWithToken } from '../models/iuser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileJSON :any;

  constructor(
    // public authService: AuthService
    private userService : UserService
  ){}

  ngOnInit(): void {
    // this.authService.user$.subscribe((dataUser:any) =>{
    //   this.profileJSON = JSON.stringify(dataUser,null, 2);
    // })
    this.userService.getCurrentUser().subscribe(
      (dataUser:any) =>{
        //console.log(dataUser)
        this.profileJSON = JSON.stringify(dataUser,null, 2);
      }
    )
  }

}
