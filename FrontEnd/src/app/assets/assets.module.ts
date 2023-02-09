import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets/assets.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CryptocurrencyComponent } from './cryptocurrency/cryptocurrency.component';
import { ValuesComponent } from './values/values.component';

@NgModule({
  declarations: [
    AssetsComponent,
    CryptocurrencyComponent,
    ValuesComponent,
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class AssetsModule { }
