import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';
import { CryptocurrencyItemComponent } from './cryptocurrency-item/cryptocurrency-item.component';
import { ValuesItemComponent } from './values-item/values-item.component';
import { CryptocurrencyComponent } from './cryptocurrency/cryptocurrency.component';

const routes: Routes = [
  { path: 'assets', component: AssetsComponent},
  { path: 'assets/cryptocurrency', component: CryptocurrencyComponent},
  { path: 'assets/cryptocurrency/:name', component: CryptocurrencyItemComponent},
  { path: 'assets/values/:name', component: ValuesItemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
