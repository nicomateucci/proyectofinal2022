import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [],
  exports:[    
    CommonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule
  ]
})
export class AngularMaterialModule {}

