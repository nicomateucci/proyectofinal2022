import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { CardComponent } from './card/card.component';
import { CarouselModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material/angular-material.module';

const utilities = [
  FooterComponent,
  NavbarComponent,
  CarrouselComponent,
  CardComponent
]

@NgModule({
  declarations: [
  ...utilities
  ],
  imports: [
    CarouselModule,
    RouterModule,
    CommonModule,
    AngularMaterialModule
  ],
  exports:[
    ...utilities
  ]
})
export class UiComponentsModule { }
