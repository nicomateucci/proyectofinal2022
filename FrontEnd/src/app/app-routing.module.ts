import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './UI-Pages/home/home.component';
import { LoginComponent } from './UI-Pages/login/login.component';
import { ProfileComponent } from './UI-Pages/profile/profile.component';
import { RegisterComponent } from './UI-Pages/register/register.component';
import { isLoggedGuard } from './Guards/is-logged.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', pathMatch: "full" 
  },
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canMatch:[isLoggedGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'register', 
    component: RegisterComponent
  },
  //Default routes redirect home
  { 
    path: '**', 
    component: HomeComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
