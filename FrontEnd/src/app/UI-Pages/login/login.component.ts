import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/Services/users/user.service';
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
  loginInvalid: Boolean = false;
  submitted : Boolean = false;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private dialog : MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>
  ){}

  loginUser() {
    this.submitted = true;
    if (this.loginForm.valid) {
      //Se debe buscar el usuario con el login y ver que el mismo exzista, retornar el currentUser$ (Observable bolleano)
      //this.userService.login(userName,password)
      this.userService.login(this.loginForm).subscribe({
        next: (user) => {
          if (user){
            this.toastr.success("User Login succesfull!","OK",{
              progressAnimation : 'increasing'
            });
            setTimeout(() => {
              location.reload();
            }, 1000);
          } else{
            this.loginInvalid = true;
            this.toastr.error('Usuario inexistente/contraseña erronea',"ERROR",{
              progressAnimation : 'increasing'
            });
          }
        }
      })
    }
  }

  register(){
    this.dialogRef.close();
    this.dialog.open(RegisterComponent);
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

}