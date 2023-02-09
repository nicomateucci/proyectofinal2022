import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './routes/error404/error404.component';
import { HomeComponent } from './routes/home/home.component';
import { ProfileComponent } from './routes/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:"full" },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  //Default routes redirect home
  { path: '**', component:Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
