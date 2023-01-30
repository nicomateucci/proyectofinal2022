//------------------------------------MODULOS------------------------------------
import {NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule } from './app-routing.module';
import {AuthModule} from '@auth0/auth0-angular'
import {HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule } from '@angular/material/table'
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule } from '@angular/material/sort';
//------------------------------------MODULOS------------------------------------

//------------------------------------COMPONENTES------------------------------------
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { BuscarComponent } from './buscar/buscar.component';
import { CardComponent } from './card/card.component';
import { TabComponent } from './tab/tab.component';
import { ActivosComponent } from './activos/activos.component';
//------------------------------------COMPONENTES------------------------------------

//------------------------------------RUTAS------------------------------------
import { ProfileComponent } from './routes/profile/profile.component';
import { HomeComponent } from './routes/home/home.component';
import { CursosComponent } from './routes/cursos/cursos.component';
//------------------------------------RUTAS------------------------------------

//------------------------------------PIPES------------------------------------
//------------------------------------PIPES------------------------------------

@NgModule({
  declarations: [
    AppComponent,
    BuscarComponent,
    CarrouselComponent,
    FooterComponent,
    NavbarComponent,
    CarrouselComponent,
    BuscarComponent,
    CardComponent,
    ProfileComponent,
    HomeComponent,
    CursosComponent,
    TabComponent,
    ActivosComponent,
  ],
  imports: [
    MatSortModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      //CAMBIAR DATOS DE M2M, API Y SPA
      domain: "dev-3h2tiekd.us.auth0.com",
      clientId: "VxudccHi4sMvsN1cGIKLNSdaG0B2bZpT",
      //M2MClientId: "dHdo47orvAJbxMVTjCOLyJfHNxjczzlM",
      //M2MClientSecret : "CAjDQePWm49SZX1fAYBZ2LLKHnOLFWEtRW3R9fAHDmT0iUyhVIEwDVcshpGETjm_"
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
