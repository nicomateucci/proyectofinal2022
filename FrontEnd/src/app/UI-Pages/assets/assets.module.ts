import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets/assets.component';
import { CryptocurrencyComponent } from './cryptocurrency/cryptocurrency.component';
import { ValuesComponent } from './values/values.component';
import { CryptocurrencyItemComponent } from './cryptocurrency-item/cryptocurrency-item.component';
import { ValuesItemComponent } from './values-item/values-item.component';
import { AngularMaterialModule } from 'src/app/UI-Componets/angular-material/angular-material.module';

@NgModule({
  declarations: [
    AssetsComponent,
    CryptocurrencyComponent,
    ValuesComponent,
    CryptocurrencyItemComponent,
    ValuesItemComponent,
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    AngularMaterialModule,
  ]
})
export class AssetsModule { }
