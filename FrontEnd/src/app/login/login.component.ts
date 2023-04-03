import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService) {
    sessionStorage.clear();
  }

  ngOnInit(): void {

  }

  proceedlogin() {
    //ESTO PODRIA RESOLVERSE CON UN TRY CATCHEN LA BD
    if (this.loginform.valid) {
      this.userService.getUser(String(this.loginform.value.id),String(this.loginform.value.password)).subscribe((data: any) => {
        if (data.password === this.loginform.value.password) {
          console.log(data);
        }
        else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

  mostrarMensaje() {
    this.toastr.info("Era por abajo palacio", "2014")
  }
}
