import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>
  ){
    sessionStorage.clear();
  }

  ngOnInit(): void {}

  loginUser() {
    if (this.loginForm.valid) {
      let userName = String(this.loginForm.value.id);
      let password = String(this.loginForm.value.password)
      this.userService.getUser(userName).subscribe((data: any) => {
        //Aca la contraseña tiene que estar hasheada para mayor seguridad
        if (data.password === password) {
          this.toastr.success("User Login succesfull!", data.id);
          this.dialogRef.close();
        }
        else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

  closePopup(){
    this.dialogRef.close();
  }

}
