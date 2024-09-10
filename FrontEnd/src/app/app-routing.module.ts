import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './UI-Pages/home/home.component';
import { ProfileComponent } from './UI-Pages/profile/profile.component';
import { isLoggedGuard } from './Guards/is-logged.guard';
import { LayoutLoginComponent } from './layouts/layout-login/layout-login.component';
import { LayoutRegisterComponent } from './layouts/layout-register/layout-register.component';
import { LayoutHomeComponent } from './layouts/layout-home/layout-home.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', pathMatch: "full" 
  },
  { 
    path: 'home', 
    component: LayoutHomeComponent 
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canMatch:[
      isLoggedGuard
    ]
  },
  { 
    path: 'login', 
    component: LayoutLoginComponent
  },
  { 
    path: 'register', 
    component: LayoutRegisterComponent
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
