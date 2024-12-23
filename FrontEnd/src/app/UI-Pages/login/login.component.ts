import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/services/users/user.service';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
import { UiComponentsModule } from 'src/app/UI-Componets/ui-components.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[
    UiComponentsModule,
    ReactiveFormsModule,
    CommonModule
  ],
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
    private router : Router
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
            //ESTO DE LLEVAR AL HOME DEBERIA SER SIEMPRE Y CUANDO NO SE DESPLIEGUE EL FORMATO MODAL, SI NO DEBERIA RECARGAR SOLAMENTE LA PESTAÑA
            this.router.navigateByUrl('/home'); 
            setTimeout(() => {
              location.reload();
            }, 500);
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
    //this.dialogRef.close();
    // this.dialog.open(RegisterComponent);
    this.router.navigateByUrl('/register');
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

}
