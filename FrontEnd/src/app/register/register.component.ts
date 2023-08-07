import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private service: UserService, 
    private router: Router,
    private toastr: ToastrService
  ){ }
  
  submitted = false;
  registerForm = new FormGroup(
    {
      id: new FormControl(null,[Validators.required, Validators.minLength(4)]),
      name: new FormControl(null,[Validators.required]), 
      password: new FormControl(null,[Validators.required, this.patternValidator()]),
      confirmPassword: new FormControl(null,[this.patternValidator()]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      // gender: new FormControl('male'),
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

  get registerFormControl() {
    return this.registerForm.controls;
  }

  registerUser() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.service.RegisterUser(this.registerForm.value).subscribe( () => {
        this.toastr.success('Please contact admin for enable access.', 'Registered successfully')
        this.router.navigate(['/home'])
      });
    } else {
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

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      }
      return null;
    };
  }

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

  //Esto sirve de ejemplo de como se haria para chequear si se vaa la base de datos a buscar Username
  //Se iria al servicio y se traeria los datos del observable
  searchUserName(userName: string) {
    const UserList = ['zalo', 'admin', 'user', 'superuser','Zalo'];
    return (UserList.indexOf(userName) > -1);
  }

  //---------------------------VALIDACIONES---------------------------//

}