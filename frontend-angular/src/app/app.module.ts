import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscarComponentComponent } from './buscar-component/buscar-component.component';
import { TableroComponentComponent } from './tablero-component/tablero-component.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { ActivoComponentComponent } from './activo-component/activo-component.component';
import { CarrouselComponentComponent } from './carrousel-component/carrousel-component.component';
import { BarraRecomendacionComponentComponent } from './barra-recomendacion-component/barra-recomendacion-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscarComponentComponent,
    TableroComponentComponent,
    MenuComponentComponent,
    ActivoComponentComponent,
    CarrouselComponentComponent,
    BarraRecomendacionComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
