import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ActivosComponent } from './activos/activos.component';
import { CursosComponent } from './routes/cursos/cursos.component';
import { HomeComponent } from './routes/home/home.component';
import { ProfileComponent } from './routes/profile/profile.component';

const routes: Routes = [
  //Public Routes
  { path: 'home', component: HomeComponent },
  { path: 'cursos', component: CursosComponent},
  { path: 'activos', component: ActivosComponent},
  { path: 'perfil', component: ProfileComponent },
  //Privates Routes
  //{ path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
  //{ path: 'cursos', component: CursosComponent, canActivate: [AuthGuard] },
  //{ path: 'activos-digitales', component: ActivoComponent, canActivate:[AuthGuard]},
  //Default routes redirect home
  { path: '**', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
