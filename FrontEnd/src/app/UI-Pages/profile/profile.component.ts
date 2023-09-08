import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/users/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileJSON :any;

  constructor(
    private userService : UserService
  ){}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (dataUser:any) =>{
        this.profileJSON = JSON.stringify(dataUser,null, 2);
      }
    )
  }

}
