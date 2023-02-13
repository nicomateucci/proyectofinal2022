import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';
import { CryptocurrencyItemComponent } from './cryptocurrency-item/cryptocurrency-item.component';
import { ValuesItemComponent } from './values-item/values-item.component';

const routes: Routes = [
  { path: 'assets', component: AssetsComponent},
  { path: 'assets/cryptocurrency/:id', component: CryptocurrencyItemComponent},
  { path: 'assets/values/:id', component: ValuesItemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
