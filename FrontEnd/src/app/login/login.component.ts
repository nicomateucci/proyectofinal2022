import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/services/users/user.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private dialog : MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>
  ){}

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
      }
      );
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

  closePopup(){
    this.dialogRef.close();
  }

  register(){
    this.closePopup();
    this.dialog.open(RegisterComponent);
  }

}
