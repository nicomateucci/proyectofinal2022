import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';

const routes: Routes = [
  { path: 'assets', component: AssetsComponent},
  { path: 'assets/cryptocurrency/:id', component: AssetsComponent},
  { path: 'assets/values/:id', component: AssetsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
