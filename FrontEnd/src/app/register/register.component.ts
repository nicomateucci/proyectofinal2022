import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { UserService } from '../services/users/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerInvalid : Boolean = false;
  submitted : Boolean = false;
  registerForm = new FormGroup(
    {
      id: new FormControl(null,[Validators.required, Validators.minLength(4)]),
      name: new FormControl(null,[Validators.required]), 
      password: new FormControl(null,[Validators.required, this.patternValidator()]),
      confirmPassword: new FormControl(null,[this.patternValidator()]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl(),
      // role: new FormControl(''),
      isactive: new FormControl(false)
    },
    {
      validators: [
        this.validatorPasswords(),
        this.validateUserName()
      ]
    }
  );

  constructor(
    private service: UserService, 
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<RegisterComponent>
  ){ }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  registerUser() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.service.registerUser(this.registerForm).subscribe({
        next: () => {
          this.toastr.success('Please contact admin for enable access.', 'Registered successfully')
          this.dialogRef.close();
          this.router.navigateByUrl('/home');
        }
      })
    } else {
      this.registerInvalid = true;
      this.toastr.warning('Please enter valid data.')
    }
  }

  //---------------------------VALIDACIONES---------------------------//

  patternValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  validatorPasswords(): ValidatorFn {
    return (control: AbstractControl) => {
      const passwordControl = control.get('password');
      const confirmPasswordControl = control.get('confirmPassword');

      if (passwordControl?.value !== confirmPasswordControl?.value) {
        confirmPasswordControl?.setErrors({ passwordMismatch: true });
      }
      
      return null;
    };
  }

  //Esto sirve de ejemplo de como se haria para chequear si se vaa la base de datos a buscar Username
  //Se iria al servicio y se traeria los datos del observable
  validateUserName(): ValidatorFn {
    return (control: AbstractControl) => {
      const userControl = control.get('id');
      setTimeout(() => {
        if (this.searchUserName(userControl?.value)) {  
          userControl?.setErrors({ userNameNotAvailable: true })
        }
      }, 1000);
      return null;
    }
  }
  
  searchUserName(userName: string) {
    const UserList = ['zalo', 'admin', 'user', 'superuser','Zalo'];
    return (UserList.indexOf(userName) > -1);
  }

  //---------------------------VALIDACIONES---------------------------//

}