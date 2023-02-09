import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { CardComponent } from './card/card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CarouselModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    CarrouselComponent,
    CardComponent
  ],
  imports: [
    MatToolbarModule,
    CarouselModule,
    RouterModule,
    CommonModule
  ],
  exports:[
    FooterComponent,
    NavbarComponent,
    CarrouselComponent,
    CardComponent
  ]
})
export class UtilitiesModule { }
