import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/services/users/user.service';
import { RegisterComponent } from '../register/register.component';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

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
    //Se debe buscar el usuario con el login y ver que el mismo exzista, retornar el currentUser$ (Observable bolleano)
    //this.userService.login(userName,password)
    this.userService.loginUser(this.loginForm).subscribe({
      next: (user) => {
        if (user){
          this.toastr.success("User Login succesfull!");
          this.dialogRef.close();
        }else{
          this.toastr.error('Usuario inexistente/contraseña erronea');
        }
      }
    })
  }
  }

  register(){
    this.dialogRef.close();
    this.dialog.open(RegisterComponent);
  }

}
